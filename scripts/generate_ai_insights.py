"""Generate per-section AI commentary for the dashboard.

Reads `dashboard/src/data/dashboard.json` + `data/processed/rejection_by_channel.json`,
calls Claude Opus 4.7 once with a structured-output schema, and writes
`dashboard/src/data/ai_insights.json`.

The dashboard reads that JSON at build time. If the file is absent, the AI
blocks simply do not render — so this script is optional.

Run:
    # one-time: put ANTHROPIC_API_KEY in .env at repo root (gitignored)
    python scripts/generate_ai_insights.py

Exits with code 0 on success, 1 on any hard error. Silently prints a notice
and exits 0 if ANTHROPIC_API_KEY is missing (no-op, safe to wire into CI).
"""
from __future__ import annotations
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

ROOT = Path(__file__).resolve().parent.parent
DASHBOARD_JSON = ROOT / "dashboard" / "src" / "data" / "dashboard.json"
REJECTION_JSON = ROOT / "data" / "processed" / "rejection_by_channel.json"
OUT_JSON = ROOT / "dashboard" / "src" / "data" / "ai_insights.json"

MODEL = "claude-opus-4-7"

SYSTEM_PROMPT = """あなたは Flaretech（採用メディア運用部署）の専属アナリストです。経営層に向けた採用マーケティング・ダッシュボードの各セクションに、次の意思決定に直結する短いコメンタリーを日本語で付けます。ダッシュボードは「数字 → 市場 → 自社診断 → 体験 → 定着」のストーリー構成です。

スタイル要件:
- 「読み手 = 経営層＋運用チームリード」。ビジネス日本語で簡潔に。
- body は 2〜4 文、数字は原文のまま引用。
- next_move は具体的な次の一手を 1 文。抽象的な「分析する」「検討する」は避け、誰が何をいつまでに、のレベルの具体性。
- 既知の KPI 目標: Indeed CPA ¥3,000 / 書類通過率 30%、Wantedly 中途エンジニア 週30件、YouTube 登録者 100名。
- 見送り理由データは応募者のうち 26% しか記録が無い点を踏まえ、断定ではなく示唆として書く。
- フレームワーク系セクション（market/diagnosis/experience/retention）では、プレースホルダー値（評判バブルの競合A〜E など）を「実値」と混同しない。自社の診断値（ワナ②=high、CX応募プロセス=2/5、ブランド8カテゴリ中4つが missing、文化フィット=high risk）は実データとして扱ってよい。
- ストーリー構成を尊重: 例えば diagnosis の body では、ワナ②と experience の文化フィット high risk が「同じ問題の別角度」であることに言及してよい。
- 「AI による分析」であることを明記する必要はない（セクションヘッダで既に示されるため）。

ファクトは入力データを超えて作らない。推論した場合は「可能性がある」「示唆される」と明示する。"""

USER_TEMPLATE = """以下は Flaretech の採用マーケティング状況ダッシュボードの入力データです。8 つのセクションそれぞれについて、body と next_move を生成してください。

**数字系（現状の数字）**
- `kpi`: ①経営サマリーの top-line KPI + WoW の解釈
- `trend`: 週次トレンドの読み解き
- `platforms_insight`: 媒体別 3 週比較の解釈（応募経路 × 見送り理由データも踏まえる）
- `movers`: 今週のベスト/ワースト（応募数 WoW）の解釈

**フレームワーク系（解釈軸）**
- `market`: ② 市場の地図（2030 チャネル地図 + 評判×認知度）で、Flaretech の位置づけと今週の動きの関連
- `diagnosis`: ③ 自社の位置づけ診断（7つのワナ + 4つの価値観スタイル + ブランドチェックリスト）で、特にワナ②「社員不在」high の影響を踏まえた視点
- `experience`: ④ 候補者体験（CX スコアカード + 内定辞退 4 ドライバー）で、文化フィット high risk の意味合い
- `retention`: ⑤ リテンション（企業イメージ × 5 HR 課題）で、採用広報の効き方

## ①の実データ
```json
{dashboard}
```

## 応募経路 × 見送り理由（採用蓄積シート 2023+、1,911 件のうち 1,440 件が理由記載あり）
```json
{rejection}
```

## フレームワーク上の Flaretech 診断値
```json
{frameworks_summary}
```
"""

_BLOCK = {
    "type": "object",
    "properties": {
        "body": {"type": "string"},
        "next_move": {"type": "string"},
    },
    "required": ["body", "next_move"],
    "additionalProperties": False,
}

_SECTION_KEYS = [
    "kpi",
    "trend",
    "platforms_insight",
    "movers",
    "market",
    "diagnosis",
    "experience",
    "retention",
]

OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {k: _BLOCK for k in _SECTION_KEYS},
    "required": _SECTION_KEYS,
    "additionalProperties": False,
}

FRAMEWORKS_SUMMARY = {
    "pitfalls": {
        "structure": "2 原因 × 7 ワナ。原因1=視点幅の説明不足、原因2=外部知識の欠如",
        "flaretech_high_severity": [
            "ワナ② 『社員不在』の採用広報 (severity: high — 元デッキで明記、優先課題)"
        ],
        "others_unscored": 6,
    },
    "channel_map_2030": {
        "active": [
            "求人媒体・サイト (Indeed/doda/type/エン転職/Wantedly/レバテック 等稼働中)",
            "求人媒体+検索エンジン/ATS (HERP 連携あり)"
        ],
        "gap": [
            "ダイレクトリクルーティング + RPO / AIレコメンド (2030年の主戦場、AIレコメンド型は未導入)"
        ],
    },
    "reputation_vs_awareness": {
        "self_position": "認知度 ≈ 1,500（低）· 口コミ評価 ≈ 3.2（未計測プレースホルダー）",
        "goal": "評価 4.0 の『大きな壁』を越えて右上へ (例: 競合C スタートアップ=評価4.3、競合D 外資IT=評価4.5)",
    },
    "candidate_experience_scorecard": {
        "scored": {
            "応募プロセス": "2/5 (recruit.flaretech.co.jp は中身がほぼ空)",
            "社内文化紹介": "2/5 (バリューは明記あるが採用広報内での言及は薄い)"
        },
        "unmeasured_categories": 6,
        "average_of_measured": 2.0,
    },
    "offer_decline": {
        "high_risk": [
            "文化フィット欠如 (採用広報に現場社員の声がほぼ無く、候補者が判断材料を持てない。ワナ②と直結)"
        ],
        "unscored": 3,
    },
    "brand_checklist": {
        "present": ["事業理解"],
        "partial": ["企業理解", "社員/社風理解", "経営理解"],
        "missing": ["職種理解", "キャリアパス・人事制度", "業界理解", "選考プロセス理解"],
        "critical_gap": "8 カテゴリ中 4 が missing。特に『選考プロセス理解』の未公開は候補者の不安を残す最大領域。",
    },
    "retention_framework": "企業イメージが強い/弱いで 5 HR 課題（育成/配置/評価/報酬/代謝）にどう効くかの枠組み。全て unknown (評価未着手)。",
}


def load_inputs() -> tuple[dict, dict]:
    dashboard = json.loads(DASHBOARD_JSON.read_text(encoding="utf-8"))
    rejection = json.loads(REJECTION_JSON.read_text(encoding="utf-8"))
    # Trim rejection down to what the model actually needs — channel list + top reasons.
    rejection_trim = {
        "applicants_considered": rejection.get("applicants"),
        "channels": [
            {
                "name": c["name"],
                "n": c.get("applied"),
                "doc_pass_rate": c.get("doc_pass_rate"),
                "offer_rate": c.get("offer_rate"),
                "accept_rate": c.get("accept_rate"),
                "top_reasons": c.get("top_reasons", [])[:3],
            }
            for c in rejection.get("channels", [])[:10]
        ],
        "overall_top_reasons": rejection.get("overall_top_reasons", [])[:10],
    }
    return dashboard, rejection_trim


def main() -> int:
    if load_dotenv is not None:
        load_dotenv(ROOT / ".env")

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print(
            "ANTHROPIC_API_KEY is not set. Skipping AI-insight generation.\n"
            "  → Put `ANTHROPIC_API_KEY=sk-ant-...` in .env at repo root, then rerun.",
            file=sys.stderr,
        )
        return 0

    import anthropic

    dashboard, rejection = load_inputs()
    user_prompt = USER_TEMPLATE.format(
        dashboard=json.dumps(dashboard, ensure_ascii=False, indent=2),
        rejection=json.dumps(rejection, ensure_ascii=False, indent=2),
        frameworks_summary=json.dumps(
            FRAMEWORKS_SUMMARY, ensure_ascii=False, indent=2
        ),
    )

    client = anthropic.Anthropic(api_key=api_key)
    with client.messages.stream(
        model=MODEL,
        max_tokens=32000,
        thinking={"type": "adaptive"},
        output_config={
            "format": {
                "type": "json_schema",
                "schema": OUTPUT_SCHEMA,
            }
        },
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    ) as stream:
        response = stream.get_final_message()

    text = next((b.text for b in response.content if b.type == "text"), None)
    if not text:
        print("No text content returned from Claude.", file=sys.stderr)
        return 1
    try:
        data = json.loads(text)
    except json.JSONDecodeError as e:
        print(f"Model returned non-JSON despite schema: {e}\n---\n{text}", file=sys.stderr)
        return 1

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "model": MODEL,
        "insights": data,
    }
    OUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"wrote {OUT_JSON}")
    print(f"  model={MODEL}")
    print(f"  input_tokens={response.usage.input_tokens}  output_tokens={response.usage.output_tokens}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
