"use client";

import { useState } from "react";

export interface CostTimePoint {
  period: string; // "2026-01" for month, or "01/02〜01/08" for week
  cost: number;
  applications: number;
  applicationCost: number | null;
  docPass: number;
  docPassCost: number | null;
  offers: number;
  offerCost: number | null;
  accepts: number;
  acceptCost: number | null;
}

export function CostTimeSeries({
  monthly,
  weekly,
  total,
}: {
  monthly: CostTimePoint[];
  weekly: CostTimePoint[];
  total: CostTimePoint;
}) {
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const rows = view === "monthly" ? monthly : weekly;
  const periodLabel = view === "monthly" ? "月" : "週";

  // For trend sparkline: applications over time
  const maxApps = Math.max(...rows.map((r) => r.applications), 1);
  const maxCost = Math.max(...rows.map((r) => r.cost), 1);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="text-xs text-zinc-500">
          {view === "monthly" ? `4 ヶ月分の月次集計` : `16 週分の週次詳細`}
          {` ・ 合計: ¥${total.cost.toLocaleString()} / 応募 ${total.applications.toLocaleString()} 件 / 承諾 ${total.accepts} 件`}
        </div>
        <div className="flex gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-0.5 text-xs dark:border-zinc-800 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setView("monthly")}
            className={`rounded-full px-2.5 py-1 transition ${
              view === "monthly"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            月次
          </button>
          <button
            type="button"
            onClick={() => setView("weekly")}
            className={`rounded-full px-2.5 py-1 transition ${
              view === "weekly"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            週次
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40">
            <tr>
              <th className="px-3 py-3 text-left font-medium">{periodLabel}</th>
              <th className="px-3 py-3 text-right font-medium">費用</th>
              <th className="px-3 py-3 text-right font-medium">応募</th>
              <th className="px-3 py-3 text-right font-medium">応募単価</th>
              <th className="px-3 py-3 text-right font-medium">書類通過</th>
              <th className="px-3 py-3 text-right font-medium">内定</th>
              <th className="px-3 py-3 text-right font-medium">承諾</th>
              <th className="px-3 py-3 text-right font-medium">承諾単価</th>
              <th className="px-3 py-3 text-left font-medium">応募トレンド</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const appsBar = (r.applications / maxApps) * 100;
              const costBar = (r.cost / maxCost) * 100;
              return (
                <tr
                  key={r.period}
                  className="border-t border-zinc-100 dark:border-zinc-800"
                >
                  <td className="px-3 py-3 font-medium">{r.period}</td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    ¥{r.cost.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {r.applications.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {r.applicationCost
                      ? `¥${r.applicationCost.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">{r.docPass}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{r.offers}</td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {r.accepts > 0 ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {r.accepts}
                      </span>
                    ) : (
                      <span className="text-zinc-400">0</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {r.acceptCost ? `¥${r.acceptCost.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${appsBar}%` }}
                        />
                      </div>
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-rose-400"
                          style={{ width: `${costBar}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-zinc-300 bg-zinc-50/60 font-semibold dark:border-zinc-700 dark:bg-zinc-800/40">
              <td className="px-3 py-3">合計</td>
              <td className="px-3 py-3 text-right tabular-nums">
                ¥{total.cost.toLocaleString()}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {total.applications.toLocaleString()}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {total.applicationCost
                  ? `¥${total.applicationCost.toLocaleString()}`
                  : "—"}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">{total.docPass}</td>
              <td className="px-3 py-3 text-right tabular-nums">{total.offers}</td>
              <td className="px-3 py-3 text-right tabular-nums">{total.accepts}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {total.acceptCost ? `¥${total.acceptCost.toLocaleString()}` : "—"}
              </td>
              <td className="px-3 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center gap-3 text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-1.5 w-4 rounded-full bg-blue-500" />
          応募数
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-1.5 w-4 rounded-full bg-rose-400" />
          費用
        </span>
      </div>
    </div>
  );
}
