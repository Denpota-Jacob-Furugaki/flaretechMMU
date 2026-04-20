# Which channels send us candidates we can't hire — and why

**Date:** 2026-04-20
**Data snapshot:** `data/snapshots/2026-04-20/` (specifically `採用蓄積シート/応募者管理シート.csv`)
**Reproducibility:** `python scripts/analyze_rejection_reasons.py [--since 2025-01-01]` regenerates every number below.

---

## Question

For every channel we spend money or time on, **are we paying to attract candidates we can't hire?** The team's weekly narrative has been flagging this qualitatively (e.g. COBOL postings attracting 60代 applicants). We now have the full `応募者管理シート` going back to 2023, with explicit `見送り理由` on ~1,440 rejected candidates — enough to quantify what's actually going wrong per channel.

## Method

- **Source:** `採用蓄積シート/応募者管理シート` (5,625 applicants with a valid 応募日, spanning 2023–2026).
- **Grouping:** by `応募経路` (channel — e.g. Indeed, type, doda, Forkwell…).
- **Pass-rate funnel:** each funnel cell (`書類選考通過`, `1次面談通過`, `内定`, `内定承諾`) counts as a pass if non-empty and not one of {×, ✕, NG, 辞退, 見送, 音信不通}. Cells holding a date, name, or 〇 all count as pass.
- **Rejection share:** `見送り理由` is free-text but clusters naturally (`年齢`, `未経験`, `海外在住`, `年齢×地方`, …). Counts are as-written — I did not attempt to split compound reasons like `年齢×地方`.

## Findings

### 1. The "broad vs targeted" split is sharp

Channels fall into two camps. The high-volume platforms (Indeed, type, doda) are the top of the funnel but convert poorly. Niche / scouts-based channels (Forkwell, Wantedly, referrals, エン転職DR, Re就活テック, テックボウル) show dramatically higher pass rates at every stage.

**Full-history (2023+) view — top 10 channels by volume:**

| Channel | Applicants | 書類通過 % | 1次通過 % | 内定 % | 承諾 % |
|---|---:|---:|---:|---:|---:|
| Indeed | 1,099 | 27% | 10% | 3.5% | 0.0% |
| type | 1,071 | 37% | 16% | 8.7% | 0.8% |
| doda | 860 | 32% | 18% | 9.4% | **5.1%** |
| Green | 356 | 56% | 26% | 11% | 0.0% |
| LP | 338 | 62% | 13% | 4.1% | 0.0% |
| レバテック | 227 | **87%** | 31% | 15% | 0.0% |
| リクナビ | 223 | 25% | 13% | 6.3% | 3.1% |
| Forkwell | 200 | 74% | **45%** | **24%** | **9.0%** |
| エン転職 | 197 | 32% | 17% | 7.1% | 3.0% |
| Wantedly | 187+67 | 23–73% | 7–42% | 3–16% | 1.6–10.4% |

Narrow-volume standouts (<50 applicants but noteworthy):

- **エン転職DR** — 39 applicants, 100% 書類通過, 54% 1次通過, **15% 承諾**.
- **リファラル (referrals)** — 34 applicants, 91% 書類通過, 68% 1次通過, 24% 内定, 3% 承諾.
- **テックボウル** — 20 applicants, 100% 書類通過, 55% 1次通過, 30% 内定.

### 2. Three rejection reasons dominate everything

Of 5,625 applicants, 1,440 have an explicit `見送り理由`. The top 3 single reasons + their pairwise combinations account for roughly **70% of all documented rejections**:

| Rejection reason | Count | Share of reasoned |
|---|---:|---:|
| 年齢 | 389 | 27% |
| 未経験 | 273 | 19% |
| 海外在住 | 106 | 7% |
| 年齢 × 地方 | 82 | 6% |
| 年齢 × 経験 | 45 | 3% |
| 外国籍 × 経験 / 経験 × 外国籍 | 56 | 4% |
| 年齢 × 未経験 / 未経験 × 年齢 | 54 | 4% |
| 経験 × 地方 / 地方 × 経験 | 37 | 3% |
| ブランク | 18 | 1% |

### 3. Each channel has its own rejection signature

The *mix* of rejection reasons differs per channel and matches what we know about how each channel targets:

| Channel | Top rejection reason | Next two |
|---|---|---|
| **Indeed** (2025+) | 年齢 (**51%** of that channel's rejections) | 未経験 (9%), 年齢×地方 (6%) |
| **type** | 未経験 (32%) | 年齢 (17%), 年齢×地方 (7%) |
| **Green** | 海外在住 (39%) | 年齢 (8%), 未経験 (8%) |
| **レバテック** | 年齢 (43%) | 海外在住 (25%) |
| **AMBI** | 海外在住 (40%) | 外国籍×経験 (13%), 未経験 (13%) |
| **ミドルの転職** | 海外在住 (20%) | 年齢 (18%), 年齢×地方 (18%) |
| **Offers** | 海外在住 (30%) | 経験×外国籍 (20%) |
| **LP** (自社) | 外国籍×経験 (24%) | 半年以下 (19%) |
| **Re就活** | 未経験 (**85%**) | — |

Read it this way: the Re就活 line is a consistency check — Re就活 is a career-switcher/junior platform, so 85% 未経験 rejections is exactly what it was designed to attract. Indeed's rejection profile (51% 年齢) likewise matches the COBOL-era narrative in 週次管理: the COBOL postings are pulling 50-70-year-old applicants that you're explicitly not hiring.

### 4. Indeed's 年齢 problem is getting *worse* in 2025+, not better

Comparing full-history vs 2025-only for Indeed:

|  | n | doc % | 年齢 as % of rejections |
|---|---:|---:|---:|
| 2023+ all | 1,099 | 27% | 42% |
| 2025+ only | 767 | 23% | **51%** |

The 年齢 share of Indeed rejections rose 9 points as the dataset narrowed to recent cohorts. The 書類通過率 simultaneously dropped 4 points. This is the opposite of what you'd want to see from COBOL-revision work unless that work is very recent (post-snapshot).

## Implications — what Flaretech should consider

These are investigation prompts, not decisions — the data says what the pattern is, not what to do about it.

1. **Indeed COBOL postings are the single biggest "wasted applications" source.** 51% of Indeed's 2025+ rejections are age-based and the narrative ties that to COBOL. Two levers: (a) edit 原稿 copy to set expectations (explicit age/experience language, role-appropriate imagery) so older applicants self-select out before applying; (b) reallocate some of the Indeed ¥145k/week toward channels that convert.
2. **type attracts too many 未経験** at 32% rejection share. Consider whether 求人原稿 is setting experience requirements clearly.
3. **Niche / scout channels convert 3–10× better than broad ones.** Forkwell 承諾 9%, エン転職DR 承諾 15%, Wantedly (proper capitalization) 承諾 10%. These are your efficient channels; the question is scaling constraint, not efficiency.
4. **Overseas-resident rejections on Green / AMBI / Offers / レバテック** suggest those platforms are being browsed by foreign engineers looking for remote Japan roles. Either open a remote/外国籍-friendly lane explicitly, or filter earlier.
5. **Referrals (34 applicants, 24% 内定 rate)** are the most efficient single source in the dataset. Worth asking: is there a structured referral program, or are these happening informally?

## Open questions / data caveats

- **Only 26% of applicants have a documented 見送り理由.** The other 74% either weren't rejected (passed to next stage, or still pending) or were rejected without a reason recorded. Anything said here about "rejection reasons" is really "rejection reasons *among those the team annotated*" — the pattern is suggestive, not the full truth.
- **承諾 data looks sparse in 2025+** (many channels show 0% accept). Possible reasons: (a) the pipeline takes weeks and recent-ish candidates haven't closed yet; (b) `内定承諾` cell isn't consistently filled; (c) hiring quotas really did dry up. Needs a spot-check with the team before drawing hard conclusions.
- **Channel name inconsistency.** Both `Wantedly` and `wantedly`, `type` and `Type`, `type direct` and `type Direct`, `Wantedy` (typo) all appear as separate channels. Counts above do NOT merge them — a small cleanup pass on 応募者管理シート would materially improve every future analysis.
- **`doda` looks *far* better on 承諾 (5.1%) than anything else at volume, but it drops out of the 2025+ slice entirely** — investigate whether the data feed stopped or whether the channel was cut.
- **Referral (34)** is small — could swing a lot with a few more data points. Treat the 24% 内定 figure as "promising" not "proven".

## Next analyses that would build on this

- **見送り理由 × 年代**: do the 年齢 rejections disappear once you control for 応募経路詳細 (specific posting)? If so, fix 原稿 on specific postings rather than platform-level decisions.
- **見送り理由 × 経験年数**: are the 未経験 rejections on type clustered at 0-1 years, or spread across experience bands?
- **Channel × 職種**: maybe Indeed is bad for Engineer roles but fine for 管理部, or vice versa. Current analysis aggregates across all roles.
- **Cost-adjusted ranking**: combine these rates with the weekly 費用 from 媒体別成果 to get cost-per-承諾 by channel. That's what the scaling decision actually hinges on.
