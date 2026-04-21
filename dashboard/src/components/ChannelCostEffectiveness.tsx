"use client";

import { useMemo, useState } from "react";

export interface ChannelCostRow {
  name: string;
  cost: number;
  costNote?: string;
  applications: number;
  applicationCost: number | null;
  docPass: number;
  docPassCost: number | null;
  offers: number;
  offerCost: number | null;
  accepts: number;
  acceptCost: number | null;
}

export interface ChannelCostData {
  period: string;
  periodLabel: string;
  source: string;
  channels: ChannelCostRow[];
  total: ChannelCostRow;
  caveats: string[];
}

type SortKey =
  | "cost"
  | "applications"
  | "applicationCost"
  | "docPass"
  | "docPassCost"
  | "offers"
  | "offerCost"
  | "accepts"
  | "acceptCost";

const COLS: { key: SortKey; label: string; unit: string; lowerIsBetter: boolean }[] = [
  { key: "cost", label: "費用", unit: "¥", lowerIsBetter: false },
  { key: "applications", label: "応募", unit: "件", lowerIsBetter: false },
  { key: "applicationCost", label: "応募単価", unit: "¥", lowerIsBetter: true },
  { key: "docPass", label: "書類通過", unit: "件", lowerIsBetter: false },
  { key: "docPassCost", label: "書類通過単価", unit: "¥", lowerIsBetter: true },
  { key: "offers", label: "内定", unit: "件", lowerIsBetter: false },
  { key: "offerCost", label: "内定単価", unit: "¥", lowerIsBetter: true },
  { key: "accepts", label: "承諾", unit: "件", lowerIsBetter: false },
  { key: "acceptCost", label: "承諾単価", unit: "¥", lowerIsBetter: true },
];

function fmtYen(v: number | null): string {
  if (v === null) return "—";
  return `¥${v.toLocaleString()}`;
}

function fmtCount(v: number | null): string {
  if (v === null) return "—";
  return v.toLocaleString();
}

/**
 * Color-code a rate cell by rank. For lower-is-better (cost per X),
 * lower percentile = greener. For higher-is-better, reverse.
 */
function rankColor(
  value: number | null,
  allValues: number[],
  lowerIsBetter: boolean,
): string {
  if (value === null) return "text-zinc-400";
  const valid = allValues.filter((v) => v !== null && v > 0) as number[];
  if (valid.length === 0) return "";
  const sorted = [...valid].sort((a, b) => a - b);
  const rank = sorted.indexOf(value);
  const pct = rank / Math.max(1, sorted.length - 1);
  const normalized = lowerIsBetter ? pct : 1 - pct;
  // normalized: 0 = best, 1 = worst
  if (normalized <= 0.2)
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (normalized <= 0.4)
    return "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300";
  if (normalized <= 0.6)
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
  if (normalized <= 0.8)
    return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300";
  return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300";
}

export function ChannelCostEffectiveness({ data }: { data: ChannelCostData }) {
  const [sortKey, setSortKey] = useState<SortKey>("acceptCost");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    return [...data.channels].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const aNum = av === null ? (sortDir === "asc" ? Infinity : -Infinity) : av;
      const bNum = bv === null ? (sortDir === "asc" ? Infinity : -Infinity) : bv;
      const cmp = aNum - bNum;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data.channels, sortKey, sortDir]);

  // Columns with all values for ranking
  const colValues: Record<SortKey, number[]> = Object.fromEntries(
    COLS.map((c) => [
      c.key,
      data.channels.map((r) => r[c.key]).filter((v): v is number => v !== null && v > 0),
    ]),
  ) as Record<SortKey, number[]>;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      // default to "best is first" — lower for cost cols, higher for count cols
      const col = COLS.find((c) => c.key === key);
      setSortDir(col?.lowerIsBetter ? "asc" : "desc");
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-zinc-500">
        <div>
          期間: <span className="font-medium">{data.period}</span> ({data.periodLabel})
        </div>
        <div>出典: {data.source}</div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40">
            <tr>
              <th className="sticky left-0 bg-zinc-50 px-4 py-3 text-left font-medium dark:bg-zinc-800/40">
                媒体
              </th>
              {COLS.map((c) => (
                <th key={c.key} className="px-3 py-3 text-right font-medium">
                  <button
                    type="button"
                    onClick={() => handleSort(c.key)}
                    className={`inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 ${
                      sortKey === c.key ? "text-zinc-900 dark:text-zinc-100" : ""
                    }`}
                    title={c.lowerIsBetter ? "低いほど良い" : "高いほど良い"}
                  >
                    {c.label}
                    <span className="text-[9px]">
                      {sortKey === c.key ? (sortDir === "desc" ? "▼" : "▲") : "↕"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.name}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <td className="sticky left-0 bg-white px-4 py-3 font-medium dark:bg-zinc-900">
                  <div>{r.name}</div>
                  {r.costNote && (
                    <div className="text-[10px] font-normal text-zinc-500">
                      {r.costNote}
                    </div>
                  )}
                </td>
                {COLS.map((c) => {
                  const value = r[c.key];
                  const displayVal =
                    c.unit === "¥" ? fmtYen(value) : fmtCount(value);
                  const color = rankColor(value, colValues[c.key], c.lowerIsBetter);
                  return (
                    <td key={c.key} className="px-3 py-3 text-right">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 tabular-nums ${color}`}
                      >
                        {displayVal}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="border-t-2 border-zinc-300 bg-zinc-50/60 font-semibold dark:border-zinc-700 dark:bg-zinc-800/40">
              <td className="sticky left-0 bg-zinc-50/60 px-4 py-3 dark:bg-zinc-800/40">
                合計
              </td>
              {COLS.map((c) => {
                const value = data.total[c.key];
                const displayVal = c.unit === "¥" ? fmtYen(value) : fmtCount(value);
                return (
                  <td key={c.key} className="px-3 py-3 text-right tabular-nums">
                    {displayVal}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
        <div>
          <span className="font-semibold">色の読み方:</span> 列ごとの相対評価。
          <span className="ml-1 inline-block rounded bg-emerald-100 px-1 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            🟢 最良
          </span>
          <span className="mx-0.5 inline-block rounded bg-amber-100 px-1 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            🟡 中
          </span>
          <span className="inline-block rounded bg-rose-100 px-1 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
            🔴 最悪
          </span>
          （応募単価〜承諾単価は低いほど良、応募〜承諾は高いほど良）
        </div>
        {data.caveats.map((c, i) => (
          <div key={i}>※ {c}</div>
        ))}
      </div>
    </div>
  );
}
