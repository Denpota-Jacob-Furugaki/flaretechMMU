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

## Next step recommendation

Move to dashboard scaffolding in a separate frontend repo (per the project's scaffold-first sequencing). This workbook folder becomes the **data source of truth**; the frontend repo will consume published summaries (not raw CSVs).
