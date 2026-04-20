# MMU workbook — first-pass findings

Scope: every tab from `メディアマーケティングユニット（MMU）.xlsx` (+ `HERP求人応募.xlsx`) is now exported to `data/raw/` and profiled in `_profile.md`.

## Tier-1 datasets (build the dashboard on these)

| Tab | Rows | Date range | Why it matters |
|---|---:|---|---|
| `0101-0413求人raw` | 1,878 | 2026-01-01 → 04-13 | Applicant-grain raw — 応募ID / 応募時刻 / 年齢 / 性別 / 応募経路 / 職種. The atomic fact table. |
| `herpデータ1208` | 7,331 | 2023-09-25 → 2025-12-08 | Historical HERP applicants (スカウト flag, 媒体リンク). Baseline / comparison. |
| `週次集計用` | 179 | 2026-01-06 → 04-17 | Weekly aggregations — likely the source powering the ⑧/⑨ WoW dashboards. |
| `Inデータ` | 498 | 2025-12-25 → 2026-04-30 | Indeed job-level metrics. |
| `スカウトデータ` | 1,038 | 2022-04 → 2025-12 | Scout-send log (送信/開封/返信). |
| `採用LP` | 27 | 2026-04-12 → 04-14 | Direct LP applications. **PII** (name, phone, email). |
| `媒体別成果（本運用）` | 66 | 2026-03-27 | Platform-level KPI table. |

## Prebuilt dashboards (copy the logic, don't reinvent)

All populated — use these to reverse-engineer the metric definitions the client already trusts:

- `① 経営サマリー（WoW）` — top-line WoW (応募数 / 書類通過数 / 書類通過率 / 内定数 / 内定承諾数).
- `③ 詳細_週次×媒体×求人` — 493 rows, the big pivot.
- `⑤ 全媒体 費用対効果` — CPA, 書類通過単価, 内定単価 per 媒体.
- `⑥ Indeed 求人別 詳細分析` / `⑦ Wantedly 求人別 詳細分析` — job-grain by platform.
- `⑧ Indeed 週次WoW` / `⑨ Wantedly 週次WoW` — 今週 / 先週 / 先々週 / Δ(WoW).

Referenced in TOC but **missing from the workbook**: `② 媒体別 応募数 週次推移`, `③-2 週次×媒体（求人抜き）`, `④ 媒体別 費用対効果`. Either hidden, deleted, or never built — ask the client.

## Data-quality flags

- `媒体別成果（阿久根さん使用）` is a personal working copy next to `媒体別成果（本運用）`. Pick one as source of truth (probably 本運用).
- `0101-0413求人【作業用】` (716 rows) is a manual working copy of `0101-0413求人raw` (1,878 rows). Rows don't match — the 作業用 sheet has filters/edits applied. Raw is authoritative.
- `▷` tabs are mostly section-divider pages (▷エンゲージ, ▷type, ▷Instagram are near-empty). Safe to ignore for data.
- PII sits in `採用LP`, `0101-0413求人raw`, `herpデータ1208` (name / age / email / phone). `data/` is git-ignored — keep it that way. Any dashboard view should aggregate or redact before leaving the local machine.

## Open questions for the client

1. The three TOC dashboards (② / ③-2 / ④) — are they hidden sheets in the live Google file, or never built?
2. The Lambda URL (`lbeom2bvfae5s32qzvjjoqadgu0ahtnk.lambda-url.ap-northeast-1.on.aws`) referenced from 週次管理 — what does it do? Do we need an API key?
3. `スプシ管理` lists 6 external sheets (採用蓄積シート, 書類選考FBシート 新体制, 書類選考基準, 掲載内容管理 doda/type/en, 採用横断定例資料, 管理部スカウトメール分析表). Do we need view access to any of these to match the internal dashboards?
4. Is read access to the `Hiroko-A-Marvel/flaretech_recruitment` repo (branch `hodgson-edits`) expected for us?
5. PII policy — is it OK to keep raw applicant data on this workstation, and in what form can it be displayed on the web dashboard (aggregates only, hashed IDs, etc.)?

## Applicant-level segmentation — what fields actually exist

Source: `data/raw/メディアマーケティングユニット（MMU）/0101-0413求人raw.csv` (1,911 applicants, 2026-01-01 → 04-13).

| Dimension | Field | Coverage | Notes |
|---|---|---|---|
| **新卒 vs 中途** | `職種` prefix | 100% 中途 | Every non-empty 職種 starts with `[中途]` / `［中途］`. Flaretech is not currently running a 新卒 pipeline — don't assume segmentation on this axis exists. |
| **年齢 (numeric)** | `年齢` | 1,782 / 1,911 | 129 rows have `0代` in 年代 → age was blank. Treat `0代` as "unknown age". |
| **年代 (bucket)** | `年代` | Same | 10 buckets: 10代…80代 + `0代` (unknown). Distribution skews 20代 (556) · 30代 (503) · 60代 (252) · 50代 (210) · 40代 (194). 60代 share (13%) is unusually high and tied to COBOL postings — weekly narrative flags this as a problem the team is actively reducing. |
| **職種** | `職種` | High | 23 distinct. Top: `[中途]開発エンジニア` (511), `[中途]インフラエンジニア` (248), `[中途]3職合同エンジニア` (238), `[中途]DXエンジニア` (180), `[中途]採用メンバー` (55), `[中途]採用リーダー (HRBP候補)` (52). |
| **応募経路 (platform)** | `応募経路` | 100% | 8 platforms: doda (774), Indeed（エンジニア）(484), Wantedly (231), エン転職 (179), 求人媒体 (123), type (49), 自社サイト (25), engage (11). Matches the 8 platforms in dashboard ①. |
| **応募経路詳細 (posting)** | `応募経路詳細` | 100% | 74 distinct — per-job-posting grain. Top post: `インフラエンジニア／フルリモート／AWS案件で50名以上募集` (239). |
| **選考ファネル** | `選考ステップ2` | 100% | 7 stages: 1.エントリー → 2.書類選考 → 3.カジュアル面談 → 4.1次選考 → 5.最終選考 → 6.内定 → 7.内定承諾. Raw funnel (YTD): 1,403 → 193 → 76 → 125 → 30 → 42 → 7. |
| **性別** | `性別` | **0%** | Column exists, all blank. Don't build segmentation on gender. |
| **業種 (applicant's industry)** | — | Not captured | Current industry only shows up in `herpデータ1208` (`現所属` field, 2023-2025 data). Not in the 2026 raw. |
| **最終学歴** | — | Same — only in `herpデータ1208`. |

## KPIs defined in the source material

Synthesized from week 2026-04-17 narrative + `⑤ 全媒体 費用対効果` + `⑧/⑨ 週次WoW` + platform target cells:

| KPI | Definition | Targets explicitly stated |
|---|---|---|
| 応募数 | Count of entries reaching `1. エントリー` | Wantedly: 中途エンジニア応募 週 30件 |
| 書類通過数 | Count reaching `2. 書類選考` | — |
| 書類通過率 | 書類通過 / 応募 | Indeed: 30% |
| 内定数 | Count reaching `6. 内定` | — |
| 内定承諾数 | Count reaching `7. 内定承諾` | — |
| CPA (応募単価) | 週間費用 / 応募数 | Indeed: ¥3,000 |
| 書類通過単価 | 週間費用 / 書類通過 | — |
| 内定単価 | 週間費用 / 内定 | — |
| 内定承諾単価 | 週間費用 / 内定承諾 | — |
| YouTube 登録者 | Cumulative channel subscribers | 100名 (mid-term goal) |
| YouTube 再生時間 | Weekly total (分) | — |

## Next step recommendation

Move to dashboard scaffolding in a separate frontend repo (per the project's scaffold-first sequencing). This workbook folder becomes the **data source of truth**; the frontend repo will consume published summaries (not raw CSVs).
