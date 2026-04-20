"use client";

import { useMemo, useState } from "react";

export interface ChannelQualityRow {
  name: string;
  applied: number;
  doc_pass: number;
  iv1_pass: number;
  offer: number;
  accept: number;
  doc_pass_rate: number | null;
  iv1_pass_rate: number | null;
  offer_rate: number | null;
  accept_rate: number | null;
  first_date: string | null;
  last_date: string | null;
  top_reasons: { reason: string; count: number }[];
}

type SortKey =
  | "applied"
  | "doc_pass_rate"
  | "iv1_pass_rate"
  | "offer_rate"
  | "accept_rate"
  | "first_date"
  | "last_date";

const COLS: {
  key: SortKey;
  label: string;
  kind: "number" | "rate" | "date";
}[] = [
  { key: "applied", label: "応募数", kind: "number" },
  { key: "doc_pass_rate", label: "書類通過率", kind: "rate" },
  { key: "iv1_pass_rate", label: "1次通過率", kind: "rate" },
  { key: "offer_rate", label: "内定率", kind: "rate" },
  { key: "accept_rate", label: "承諾率", kind: "rate" },
  { key: "first_date", label: "初回応募", kind: "date" },
  { key: "last_date", label: "直近応募", kind: "date" },
];

const MIN_APPS_OPTIONS = [1, 10, 30, 100];

function fmtPct(v: number | null): string {
  if (v === null) return "—";
  return `${(v * 100).toFixed(1)}%`;
}

function rateColor(v: number | null, highIsGood = true): string {
  if (v === null) return "bg-zinc-300 dark:bg-zinc-700";
  if (highIsGood) {
    if (v >= 0.2) return "bg-emerald-500";
    if (v >= 0.1) return "bg-lime-500";
    if (v >= 0.05) return "bg-yellow-500";
    if (v >= 0.01) return "bg-amber-500";
    return "bg-rose-500";
  }
  return "bg-blue-500";
}

function Bar({
  value,
  maxValue,
  color,
}: {
  value: number | null;
  maxValue: number;
  color: string;
}) {
  const pct =
    value === null ? 0 : Math.max(0, Math.min(100, (value / maxValue) * 100));
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ChannelQuality({
  channels,
  totalApplicants,
}: {
  channels: ChannelQualityRow[];
  totalApplicants: number;
}) {
  const [minApps, setMinApps] = useState<number>(10);
  const [sortKey, setSortKey] = useState<SortKey>("accept_rate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    return channels
      .filter((c) => c.applied >= minApps)
      .slice()
      .sort((a, b) => {
        const getter = (r: ChannelQualityRow): number | string | null => {
          const v = r[sortKey];
          if (sortKey === "first_date" || sortKey === "last_date") {
            return v ?? "";
          }
          return (v as number | null) ?? -1;
        };
        const av = getter(a);
        const bv = getter(b);
        let cmp = 0;
        if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
        else cmp = String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [channels, minApps, sortKey, sortDir]);

  const totalFilteredApps = filtered.reduce((s, r) => s + r.applied, 0);
  const totalFilteredAccept = filtered.reduce((s, r) => s + r.accept, 0);

  // Max rate for bar normalization (cap at 1.0 but shrink if all are small)
  const maxDoc = Math.max(0.3, ...filtered.map((r) => r.doc_pass_rate ?? 0));
  const maxIv1 = Math.max(0.2, ...filtered.map((r) => r.iv1_pass_rate ?? 0));
  const maxOffer = Math.max(0.1, ...filtered.map((r) => r.offer_rate ?? 0));
  const maxAccept = Math.max(0.05, ...filtered.map((r) => r.accept_rate ?? 0));
  const maxApps = Math.max(1, ...filtered.map((r) => r.applied));

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir(key === "first_date" ? "asc" : "desc");
    }
  };

  const rateColumnColor = (key: SortKey, v: number | null) => {
    if (key === "doc_pass_rate" || key === "iv1_pass_rate" || key === "offer_rate" || key === "accept_rate") {
      return rateColor(v);
    }
    return "bg-zinc-400";
  };

  const maxByCol: Record<SortKey, number> = {
    applied: maxApps,
    doc_pass_rate: maxDoc,
    iv1_pass_rate: maxIv1,
    offer_rate: maxOffer,
    accept_rate: maxAccept,
    first_date: 1,
    last_date: 1,
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-zinc-500">
          全履歴 {totalApplicants.toLocaleString()} 件のうち、
          応募 {minApps.toLocaleString()} 件以上のチャネルを表示
          ({filtered.length} チャネル · 表示応募 {totalFilteredApps.toLocaleString()} 件 · 承諾 {totalFilteredAccept} 件)
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">応募数下限:</span>
          <div className="flex gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
            {MIN_APPS_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setMinApps(n)}
                className={`rounded-full px-2.5 py-1 transition ${
                  minApps === n
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                ≥ {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium">応募経路</th>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  className="px-3 py-3 text-right font-medium"
                >
                  <button
                    type="button"
                    onClick={() => handleSort(c.key)}
                    className={`inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 ${
                      sortKey === c.key ? "text-zinc-900 dark:text-zinc-100" : ""
                    }`}
                  >
                    {c.label}
                    <span className="text-[9px]">
                      {sortKey === c.key ? (sortDir === "desc" ? "▼" : "▲") : "↕"}
                    </span>
                  </button>
                </th>
              ))}
              <th className="px-3 py-3 text-left font-medium">主な見送り理由</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.name}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <td className="px-4 py-3 font-medium">{r.name}</td>

                <td className="px-3 py-3 text-right tabular-nums">
                  <div>{r.applied.toLocaleString()}</div>
                  <div className="mt-1 w-24 ml-auto">
                    <Bar
                      value={r.applied}
                      maxValue={maxByCol.applied}
                      color="bg-blue-500"
                    />
                  </div>
                </td>

                {(
                  [
                    ["doc_pass_rate", r.doc_pass_rate],
                    ["iv1_pass_rate", r.iv1_pass_rate],
                    ["offer_rate", r.offer_rate],
                    ["accept_rate", r.accept_rate],
                  ] as [SortKey, number | null][]
                ).map(([key, value]) => (
                  <td key={key} className="px-3 py-3 text-right">
                    <div className="tabular-nums">{fmtPct(value)}</div>
                    <div className="mt-1 w-24 ml-auto">
                      <Bar
                        value={value}
                        maxValue={maxByCol[key]}
                        color={rateColumnColor(key, value)}
                      />
                    </div>
                  </td>
                ))}

                <td className="px-3 py-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                  {r.first_date ?? "—"}
                </td>
                <td className="px-3 py-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                  {r.last_date ?? "—"}
                </td>

                <td className="px-3 py-3 text-left text-xs text-zinc-600 dark:text-zinc-400">
                  {r.top_reasons.length === 0 ? (
                    <span className="text-zinc-400">—</span>
                  ) : (
                    <span className="line-clamp-2">
                      {r.top_reasons
                        .slice(0, 2)
                        .map((tr) => `${tr.reason}(${tr.count})`)
                        .join(" · ")}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-zinc-500">
        承諾率 = 内定承諾 ÷ 応募。色は 0% 赤 → 20%+ 緑 で相対表示。
        チャネル名の表記ゆれ (type vs Type, Wantedly vs wantedly) は統合していない点にご注意ください。
      </p>
    </div>
  );
}
