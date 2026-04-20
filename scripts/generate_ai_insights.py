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

SYSTEM_PROMPT = """あなたは Flaretech（採用メディア運用部署）の専属アナリストです。経営層に向けた週次ダッシュボードの各セクションに、次の意思決定に直結する短いコメンタリーを日本語で付けます。

スタイル要件:
- 「読み手 = 経営層＋運用チームリード」。ビジネス日本語で簡潔に。
- body は 2〜4 文、数字は原文のまま引用。
- next_move は具体的な次の一手を 1 文。抽象的な「分析する」「検討する」は避け、誰が何をいつまでに、レベルの具体性。
- 既知の KPI 目標：Indeed CPA ¥3,000 / 書類通過率 30%、Wantedly 中途エンジニア 週30件、YouTube 登録者 100名。
- 見送り理由データは応募者のうち 26% しか記録が無い点を踏まえ、断定ではなく示唆として書くこと。
- 「AI による分析」であることを明記する必要はない（セクションヘッダで既に示されるため）。

ファクトは入力データを超えて作らない。推論した場合は「可能性がある」「示唆される」と明示する。"""

USER_TEMPLATE = """以下は Flaretech の採用メディア運用ダッシュボード（2026-04-10〜04-16 週）の生データです。4 つのセクション（kpi / trend / platforms_insight / movers）それぞれについて、body と next_move を生成してください。

## ダッシュボード本体（①経営サマリー）
```json
{dashboard}
```

## 応募経路 × 見送り理由（採用蓄積シート全期間、1,911 件のうち 1,440 件が理由記載あり）
```json
{rejection}
```
"""

OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "kpi": {
            "type": "object",
            "properties": {
                "body": {"type": "string"},
                "next_move": {"type": "string"},
            },
            "required": ["body", "next_move"],
            "additionalProperties": False,
        },
        "trend": {
            "type": "object",
            "properties": {
                "body": {"type": "string"},
                "next_move": {"type": "string"},
            },
            "required": ["body", "next_move"],
            "additionalProperties": False,
        },
        "platforms_insight": {
            "type": "object",
            "properties": {
                "body": {"type": "string"},
                "next_move": {"type": "string"},
            },
            "required": ["body", "next_move"],
            "additionalProperties": False,
        },
        "movers": {
            "type": "object",
            "properties": {
                "body": {"type": "string"},
                "next_move": {"type": "string"},
            },
            "required": ["body", "next_move"],
            "additionalProperties": False,
        },
    },
    "required": ["kpi", "trend", "platforms_insight", "movers"],
    "additionalProperties": False,
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
    )

    client = anthropic.Anthropic(api_key=api_key)
    with client.messages.stream(
        model=MODEL,
        max_tokens=16000,
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
