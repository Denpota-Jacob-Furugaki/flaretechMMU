"""Export every tab of every .xlsx in the project root to CSV under data/raw/<workbook>/.

Run from project root:  python scripts/export_xlsx_to_csv.py
"""
from __future__ import annotations
import csv
import re
import sys
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"


def slugify(name: str) -> str:
    s = name.strip().replace(" ", "_")
    s = re.sub(r"[\\/:*?\"<>|]", "_", s)
    return s or "untitled"


def export_workbook(xlsx_path: Path) -> list[tuple[str, int, int]]:
    out_dir = RAW / slugify(xlsx_path.stem)
    out_dir.mkdir(parents=True, exist_ok=True)
    results: list[tuple[str, int, int]] = []

    wb = openpyxl.load_workbook(xlsx_path, read_only=True, data_only=True)
    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        csv_path = out_dir / f"{slugify(sheet_name)}.csv"
        rows_written = 0
        max_cols = 0
        with csv_path.open("w", encoding="utf-8-sig", newline="") as f:
            writer = csv.writer(f)
            trailing_blank = 0
            buffer: list[list] = []
            for row in ws.iter_rows(values_only=True):
                values = ["" if v is None else v for v in row]
                while values and values[-1] == "":
                    values.pop()
                if not values:
                    trailing_blank += 1
                    buffer.append([])
                    continue
                if trailing_blank:
                    for _ in buffer:
                        writer.writerow([])
                    buffer = []
                    trailing_blank = 0
                writer.writerow(values)
                rows_written += 1
                max_cols = max(max_cols, len(values))
        results.append((sheet_name, rows_written, max_cols))
    wb.close()
    return results


def main() -> int:
    xlsx_files = sorted(ROOT.glob("*.xlsx"))
    if not xlsx_files:
        print("no .xlsx files found in", ROOT)
        return 1

    for xlsx in xlsx_files:
        print(f"\n== {xlsx.name} ==")
        for sheet_name, rows, cols in export_workbook(xlsx):
            print(f"  {sheet_name:40s}  rows={rows:5d}  cols={cols:3d}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
