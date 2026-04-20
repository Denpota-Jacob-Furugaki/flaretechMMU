"""Profile every CSV under data/raw/. Emit a Markdown summary at data/processed/_profile.md.

For each CSV:
- row count (non-empty)
- column count
- header row (best-effort: first row with >=2 non-empty values)
- min/max of any date-looking column
- a 1-line sample row
"""
from __future__ import annotations
import csv
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data" / "processed" / "_profile.md"

DATE_RE = re.compile(r"^\s*(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})")


def parse_date(val: str) -> datetime | None:
    if not isinstance(val, str):
        val = str(val)
    m = DATE_RE.match(val)
    if not m:
        return None
    try:
        return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    except ValueError:
        return None


def profile_csv(path: Path) -> dict:
    rows: list[list[str]] = []
    with path.open("r", encoding="utf-8-sig") as f:
        for row in csv.reader(f):
            rows.append(row)

    non_empty = [r for r in rows if any(c.strip() for c in r)]
    if not non_empty:
        return {"rows": 0, "cols": 0, "header": [], "sample": [], "date_min": None, "date_max": None}

    header_row = None
    for r in non_empty[:15]:
        if sum(1 for c in r if c.strip()) >= 2:
            header_row = r
            break
    header = header_row or non_empty[0]

    sample = non_empty[1] if len(non_empty) > 1 else []

    dmin = dmax = None
    for r in non_empty:
        for cell in r:
            d = parse_date(cell) if isinstance(cell, str) else None
            if d is None:
                continue
            if dmin is None or d < dmin:
                dmin = d
            if dmax is None or d > dmax:
                dmax = d

    return {
        "rows": len(non_empty),
        "cols": max(len(r) for r in non_empty),
        "header": header,
        "sample": sample,
        "date_min": dmin.strftime("%Y-%m-%d") if dmin else None,
        "date_max": dmax.strftime("%Y-%m-%d") if dmax else None,
    }


def main() -> int:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    lines: list[str] = ["# Raw data profile\n"]
    for workbook_dir in sorted(RAW.iterdir()):
        if not workbook_dir.is_dir():
            continue
        lines.append(f"\n## {workbook_dir.name}\n")
        lines.append("| Tab | Rows | Cols | Date range | Header (first non-empty row) |")
        lines.append("|-----|-----:|-----:|------------|------------------------------|")
        for csv_path in sorted(workbook_dir.glob("*.csv")):
            p = profile_csv(csv_path)
            header_preview = " · ".join(str(h)[:18] for h in p["header"][:12] if str(h).strip())
            date_range = ""
            if p["date_min"] and p["date_max"]:
                date_range = f"{p['date_min']} → {p['date_max']}"
            tab = csv_path.stem
            # escape pipes
            header_preview = header_preview.replace("|", "\\|")
            tab_md = tab.replace("|", "\\|")
            lines.append(
                f"| {tab_md} | {p['rows']} | {p['cols']} | {date_range} | {header_preview} |"
            )
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
