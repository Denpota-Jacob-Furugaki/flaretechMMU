import { KPI } from "@/lib/types";
import { deltaClass, fmtDelta, fmtNumber, fmtPercent } from "@/lib/format";

export function KpiCard({ kpi }: { kpi: KPI }) {
  const fmt = (n: number | null | undefined) =>
    kpi.isRate ? fmtPercent(n) : fmtNumber(n);

  const delta = fmtDelta(kpi.deltaWoW, kpi.isRate ? "pt" : "");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {kpi.name}
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <div className="text-3xl font-semibold tabular-nums">
          {fmt(kpi.current)}
        </div>
        <div className={`text-sm font-medium tabular-nums ${deltaClass(delta.kind)}`}>
          {delta.text}
        </div>
      </div>
      <div className="mt-3 space-y-0.5 text-xs text-zinc-500 tabular-nums">
        <div>先週: {fmt(kpi.lastWeek)}</div>
        <div>先々週: {fmt(kpi.twoWeeksAgo)}</div>
      </div>
    </div>
  );
}
