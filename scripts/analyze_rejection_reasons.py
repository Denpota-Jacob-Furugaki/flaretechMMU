"""Cross-tab 応募経路 × 見送り理由 from 応募者管理シート.

Produces:
- Channel volume + funnel pass-rates (応募 → 書類通過 → 1次通過 → 内定 → 承諾)
- Top 見送り理由 overall
- 応募経路 × 見送り理由 matrix (normalized within each channel, so you see the
  *mix* of rejection types per channel rather than raw counts)

Header row is at index 2 (rows 0-1 are category + legend); data starts row 3.
All numbers exclude rows with blank 応募経路 or blank 応募日.

Usage:
    python scripts/analyze_rejection_reasons.py [--since YYYY-MM-DD]

If --since is given, only applicants with 応募日 >= that date are counted.
"""
from __future__ import annotations
import argparse
import csv
import json
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_CSV = ROOT / "data" / "raw" / "採用蓄積シート" / "応募者管理シート.csv"
OUT_JSON = ROOT / "data" / "processed" / "rejection_by_channel.json"

COL_CHANNEL = 0
COL_ROLE_BUCKET = 2  # エンジニアor営業
COL_EXPERIENCE = 4   # 経験年数
COL_REASON = 5       # 見送り理由
COL_DATE = 6         # 応募日
COL_DOC_PASS = 7     # 書類選考通過
COL_IV1_PASS = 14    # 1次面談通過
COL_IV2_PASS = 20    # 2次面談通過
COL_OFFER = 27       # 内定
COL_ACCEPT = 29      # 内定承諾

DATE_RE = re.compile(r"^\s*(\d{4})[-/](\d{1,2})[-/](\d{1,2})")


def parse_date(s: str) -> datetime | None:
    m = DATE_RE.match(s)
    if not m:
        return None
    try:
        return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    except ValueError:
        return None


def truthy(cell: str) -> bool:
    """A funnel cell counts as 'passed' if it's non-empty and not explicitly
    negative (×, NG, 辞退, 見送り, など). We treat any non-blank 'yes-ish'
    marker (〇, OK, 済, a date, a name) as a pass."""
    s = (cell or "").strip()
    if not s:
        return False
    neg = ("×", "✕", "NG", "辞退", "見送", "音信不通")
    return not any(token in s for token in neg)


def normalize_reason(s: str) -> str:
    s = (s or "").strip()
    if not s:
        return ""
    # Collapse whitespace, unify half/full-width marks
    s = re.sub(r"\s+", " ", s)
    return s


def load_applicants(since: datetime | None) -> list[list[str]]:
    with SRC_CSV.open("r", encoding="utf-8-sig") as f:
        rows = list(csv.reader(f))
    out = []
    for r in rows[3:]:
        if len(r) <= COL_DATE:
            continue
        channel = (r[COL_CHANNEL] or "").strip()
        if not channel:
            continue
        d = parse_date(r[COL_DATE]) if len(r) > COL_DATE else None
        if d is None:
            continue
        if since and d < since:
            continue
        out.append(r)
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", type=str, default=None,
                    help="YYYY-MM-DD; restrict to applicants on/after this date")
    args = ap.parse_args()
    since = parse_date(args.since) if args.since else None

    apps = load_applicants(since)
    print(f"Applicants considered: {len(apps)}  (since={args.since or 'all'})")
    print()

    # --- Volume + funnel per channel ------------------------------------------
    funnel: dict[str, dict[str, int]] = defaultdict(
        lambda: {"applied": 0, "doc_pass": 0, "iv1_pass": 0, "iv2_pass": 0,
                 "offer": 0, "accept": 0, "reasoned": 0}
    )
    for r in apps:
        ch = r[COL_CHANNEL].strip()
        f = funnel[ch]
        f["applied"] += 1
        if truthy(r[COL_DOC_PASS] if len(r) > COL_DOC_PASS else ""):
            f["doc_pass"] += 1
        if truthy(r[COL_IV1_PASS] if len(r) > COL_IV1_PASS else ""):
            f["iv1_pass"] += 1
        if truthy(r[COL_IV2_PASS] if len(r) > COL_IV2_PASS else ""):
            f["iv2_pass"] += 1
        if truthy(r[COL_OFFER] if len(r) > COL_OFFER else ""):
            f["offer"] += 1
        if truthy(r[COL_ACCEPT] if len(r) > COL_ACCEPT else ""):
            f["accept"] += 1
        if normalize_reason(r[COL_REASON] if len(r) > COL_REASON else ""):
            f["reasoned"] += 1

    channels_by_volume = sorted(funnel.items(), key=lambda kv: -kv[1]["applied"])

    print("=" * 86)
    print("VOLUME + FUNNEL PER CHANNEL")
    print("=" * 86)
    header = f"{'channel':26s}  {'n':>6}  {'doc%':>5}  {'iv1%':>5}  {'offer%':>6}  {'accept%':>7}  {'n_rej':>6}"
    print(header)
    print("-" * len(header))
    for ch, f in channels_by_volume:
        n = f["applied"]
        if n == 0:
            continue
        print(
            f"{ch[:26]:26s}  {n:6d}  "
            f"{100 * f['doc_pass'] / n:5.1f}  "
            f"{100 * f['iv1_pass'] / n:5.1f}  "
            f"{100 * f['offer'] / n:6.1f}  "
            f"{100 * f['accept'] / n:7.1f}  "
            f"{f['reasoned']:6d}"
        )
    print()

    # --- Top 見送り理由 overall ----------------------------------------------
    overall_reasons: Counter[str] = Counter()
    for r in apps:
        reason = normalize_reason(r[COL_REASON] if len(r) > COL_REASON else "")
        if reason:
            overall_reasons[reason] += 1

    print("=" * 86)
    print(f"TOP 見送り理由 (overall, {sum(overall_reasons.values())} with a reason out of {len(apps)})")
    print("=" * 86)
    for reason, n in overall_reasons.most_common(20):
        print(f"  {n:4d}  {reason}")
    print()

    # --- Channel × reason mix -------------------------------------------------
    channel_reasons: dict[str, Counter[str]] = defaultdict(Counter)
    for r in apps:
        ch = r[COL_CHANNEL].strip()
        reason = normalize_reason(r[COL_REASON] if len(r) > COL_REASON else "")
        if ch and reason:
            channel_reasons[ch][reason] += 1

    print("=" * 86)
    print("TOP 3 見送り理由 PER CHANNEL (as share of that channel's reasoned rejections)")
    print("=" * 86)
    for ch, _f in channels_by_volume:
        cr = channel_reasons.get(ch)
        if not cr:
            continue
        total = sum(cr.values())
        if total == 0:
            continue
        top = cr.most_common(3)
        pieces = "  ·  ".join(
            f"{reason[:30]} ({100*n/total:.0f}%)" for reason, n in top
        )
        print(f"  [{ch[:20]:20s}]  n_rej={total:4d}   {pieces}")
    print()

    # --- Persist JSON for later dashboard use ---------------------------------
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "since": args.since,
        "applicants": len(apps),
        "channels": [
            {
                "name": ch,
                **f,
                "doc_pass_rate": f["doc_pass"] / f["applied"] if f["applied"] else None,
                "iv1_pass_rate": f["iv1_pass"] / f["applied"] if f["applied"] else None,
                "offer_rate": f["offer"] / f["applied"] if f["applied"] else None,
                "accept_rate": f["accept"] / f["applied"] if f["applied"] else None,
                "top_reasons": [
                    {"reason": reason, "count": n}
                    for reason, n in channel_reasons.get(ch, Counter()).most_common(5)
                ],
            }
            for ch, f in channels_by_volume
        ],
        "overall_top_reasons": [
            {"reason": reason, "count": n}
            for reason, n in overall_reasons.most_common(20)
        ],
    }
    OUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"wrote {OUT_JSON}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
