# Analyses

Dated markdown writeups — one per investigation. Each file lives forever; we don't delete old ones as the data changes.

## Filename pattern

`YYYY-MM-DD-short-topic.md`

Examples:
- `2026-04-20-applicant-segmentation-baseline.md`
- `2026-04-27-indeed-cobol-age-skew.md`
- `2026-05-04-youtube-ga4-funnel.md`

## Structure of each writeup

```markdown
# <Title>

**Date:** 2026-04-20
**Data snapshot:** `data/snapshots/2026-04-20/`
**Author:** <you>

## Question

<What are we trying to answer?>

## Method

<Which tabs, which joins, which filters. Short — a reader should be able to reproduce from the raw CSVs.>

## Findings

<Headline numbers first, then drill-downs. Include a chart or table whenever you can.>

## Implications

<What should Flaretech DO differently based on this? This is the only section the client actually reads.>

## Open questions

<Things to follow up on, data gaps found during the analysis.>
```

## Relationship to the dashboard

- **Dashboard pages** show the state of things *now*. They're meant for recurring weekly review.
- **Analyses here** are one-shot deep dives. Specific question, specific answer, dated.

When an analysis finding is important enough to watch over time, it graduates into a dashboard page (or a metric on one).
