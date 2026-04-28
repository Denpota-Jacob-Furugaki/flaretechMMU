import Link from "next/link";
import { mission } from "@/data/mission";
import { fmtNumber } from "@/lib/format";

export function MissionRibbon() {
  const m = mission;
  const pct = Math.round(
    (m.target.currentMonthlyAvg / m.target.monthlyHires) * 100,
  );

  return (
    <Link
      href="/recruiting"
      className="mb-4 block rounded-lg border border-rose-200 bg-rose-50/50 px-4 py-2 text-xs transition hover:border-rose-300 hover:bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/20 dark:hover:border-rose-800 dark:hover:bg-rose-950/30"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Mission
        </span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          月 {fmtNumber(m.target.monthlyHires)} 名以上の採用
        </span>
        <span className="text-zinc-500">
          現状 月 {fmtNumber(m.target.currentMonthlyAvg)} 件 (達成率 {pct}%)
        </span>
        <span className="text-zinc-500">
          直近 {m.cumulative.weeks} 週 累計 応募{" "}
          <span className="tabular-nums">{fmtNumber(m.cumulative.applications)}</span>
          {" / 通過 "}
          <span className="tabular-nums">{fmtNumber(m.cumulative.docPass)}</span>
          {" / 承諾 "}
          <span className="tabular-nums">{fmtNumber(m.cumulative.offers)}</span>
        </span>
        <span className="ml-auto text-rose-600 dark:text-rose-400">
          詳細 →
        </span>
      </div>
    </Link>
  );
}
