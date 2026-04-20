"""Parse the ① 経営サマリー（WoW） CSV into a clean JSON the Next.js app can import.

Only aggregate numbers (no PII) are emitted, so the JSON is safe to commit.

Row indices (0-based) in the exported CSV:
    idx  1  | title
    idx  2  | period line
    idx  4  | KPI header row (cols 1,3,5,7,9)
    idx  5  | KPI current values
    idx  6  | KPI 先週
    idx  7  | KPI 先々週
    idx  8  | KPI Δ WoW
    idx 11  | platform/trend header row
    idx 12..19 | 8 platform rows
    idx 20  | 全媒体 合計 row
    idx 12..27 | weekly trend (cols 14=週, 15=応募数, 16=書類通過率, 17=内定数)
    idx 59..61 | best 3 (cols 1..4) / worst 3 (cols 6..9)

Output: dashboard/src/data/dashboard.json
"""
from __future__ import annotations
import csv
import json
import re
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_CSV = ROOT / "data" / "raw" / "メディアマーケティングユニット（MMU）" / "①_経営サマリー（WoW）.csv"
APPLICANT_CSV = ROOT / "data" / "raw" / "採用蓄積シート" / "応募者管理シート.csv"
OUT_JSON = ROOT / "dashboard" / "src" / "data" / "dashboard.json"


def load_rows() -> list[list[str]]:
    with SRC_CSV.open("r", encoding="utf-8-sig") as f:
        return [row for row in csv.reader(f)]


def parse_delta(s: str) -> float | None:
    if not s:
        return None
    s = s.strip()
    if s.startswith("±"):
        return 0.0
    m = re.match(r"^([▲▼])([\d.]+)", s)
    if not m:
        return None
    val = float(m.group(2))
    return val if m.group(1) == "▲" else -val


def parse_prev(s: str) -> float | None:
    """'先週: 184' -> 184.0; '先週: 17.9%' -> 0.179."""
    if not s:
        return None
    m = re.search(r":\s*([\d.]+)%?", s)
    if not m:
        return None
    v = float(m.group(1))
    return v / 100 if "%" in s else v


def parse_num(s: str) -> float | None:
    s = (s or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def get(row: list[str], col: int) -> str:
    return row[col] if col < len(row) else ""


_DATE_RE = re.compile(r"^\s*(\d{4})[-/](\d{1,2})[-/](\d{1,2})")


def _parse_applicant_date(s: str) -> datetime | None:
    m = _DATE_RE.match(s)
    if not m:
        return None
    try:
        return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    except ValueError:
        return None


def _truthy_applicant(cell: str) -> bool:
    s = (cell or "").strip()
    if not s:
        return False
    neg = ("×", "✕", "NG", "辞退", "見送", "音信不通")
    return not any(token in s for token in neg)


def build_weekly_long() -> list[dict] | None:
    """Aggregate 応募者管理シート by ISO week (Monday-starting). Returns list
    of {weekStart, applications, passRate, offers} sorted oldest first, or
    None if the source CSV isn't present.

    Columns used: 応募日 (col 6), 書類選考通過 (col 7), 内定 (col 27).
    Header is at row index 2; data starts at row index 3.
    """
    if not APPLICANT_CSV.exists():
        return None
    with APPLICANT_CSV.open("r", encoding="utf-8-sig") as f:
        rows = list(csv.reader(f))

    buckets: dict[str, dict[str, int]] = defaultdict(
        lambda: {"applications": 0, "docPass": 0, "offers": 0}
    )
    for r in rows[3:]:
        date = _parse_applicant_date(get(r, 6))
        if date is None:
            continue
        week_start = (date - timedelta(days=date.weekday())).strftime("%Y-%m-%d")
        b = buckets[week_start]
        b["applications"] += 1
        if _truthy_applicant(get(r, 7)):
            b["docPass"] += 1
        if _truthy_applicant(get(r, 27)):
            b["offers"] += 1

    out: list[dict] = []
    for key in sorted(buckets.keys()):
        v = buckets[key]
        n = v["applications"]
        out.append(
            {
                "weekStart": key,
                "applications": n,
                "passRate": (v["docPass"] / n) if n > 0 else None,
                "offers": v["offers"],
            }
        )
    return out


def build() -> dict:
    rows = load_rows()

    title = get(rows[1], 1) if len(rows) > 1 else ""
    period = get(rows[2], 1) if len(rows) > 2 else ""

    kpi_defs = [
        ("応募数", 1, False),
        ("書類通過数", 3, False),
        ("書類通過率", 5, True),
        ("内定数", 7, False),
        ("内定承諾数", 9, False),
    ]
    kpis = []
    for name, col, is_rate in kpi_defs:
        kpis.append({
            "name": name,
            "isRate": is_rate,
            "current": parse_num(get(rows[5], col)),
            "lastWeek": parse_prev(get(rows[6], col)),
            "twoWeeksAgo": parse_prev(get(rows[7], col)),
            "deltaWoW": parse_delta(get(rows[8], col)),
        })

    def platform_from(row: list[str]) -> dict:
        return {
            "name": get(row, 1),
            "apps": {
                "current": parse_num(get(row, 2)),
                "lastWeek": parse_num(get(row, 3)),
                "twoWeeksAgo": parse_num(get(row, 4)),
                "delta": parse_delta(get(row, 5)),
            },
            "passRate": {
                "current": parse_num(get(row, 6)),
                "lastWeek": parse_num(get(row, 7)),
                "twoWeeksAgo": parse_num(get(row, 8)),
                "delta": parse_delta(get(row, 9)),
            },
            "offers": {
                "current": parse_num(get(row, 10)),
                "lastWeek": parse_num(get(row, 11)),
                "twoWeeksAgo": parse_num(get(row, 12)),
            },
        }

    platforms = [platform_from(rows[i]) for i in range(12, 20) if get(rows[i], 1).strip()]
    total = platform_from(rows[20]) if len(rows) > 20 else None

    weekly: list[dict] = []
    for i in range(12, 28):
        if i >= len(rows):
            break
        week = get(rows[i], 14).strip()
        apps = parse_num(get(rows[i], 15))
        if not week or apps is None:
            continue
        weekly.append({
            "week": week,
            "applications": apps,
            "passRate": parse_num(get(rows[i], 16)),
            "offers": parse_num(get(rows[i], 17)),
        })

    best: list[dict] = []
    worst: list[dict] = []
    for i in range(59, 62):
        if i >= len(rows):
            break
        row = rows[i]
        if get(row, 1).strip():
            best.append({
                "name": get(row, 1),
                "current": parse_num(get(row, 2)),
                "lastWeek": parse_num(get(row, 3)),
                "delta": parse_delta(get(row, 4)),
            })
        if get(row, 6).strip():
            worst.append({
                "name": get(row, 6),
                "current": parse_num(get(row, 7)),
                "lastWeek": parse_num(get(row, 8)),
                "delta": parse_delta(get(row, 9)),
            })

    weekly_long = build_weekly_long()

    return {
        "title": title,
        "period": period,
        "kpis": kpis,
        "platforms": platforms,
        "total": total,
        "weekly": weekly,
        "weeklyLong": weekly_long,
        "best": best,
        "worst": worst,
        "sourceFile": "①_経営サマリー（WoW）.csv",
    }


def main() -> int:
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    data = build()
    OUT_JSON.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"wrote {OUT_JSON}")
    long_len = len(data["weeklyLong"]) if data["weeklyLong"] else 0
    print(
        f"  kpis={len(data['kpis'])} "
        f"platforms={len(data['platforms'])} "
        f"weekly={len(data['weekly'])} "
        f"weeklyLong={long_len} "
        f"best={len(data['best'])} "
        f"worst={len(data['worst'])}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
