import { Platform } from "@/lib/types";
import { deltaClass, fmtDelta, fmtNumber, fmtPercent } from "@/lib/format";

function DeltaCell({
  value,
  suffix = "",
}: {
  value: number | null | undefined;
  suffix?: string;
}) {
  const d = fmtDelta(value, suffix);
  return (
    <span className={`tabular-nums ${deltaClass(d.kind)}`}>{d.text}</span>
  );
}

export function PlatformTable({
  platforms,
  total,
}: {
  platforms: Platform[];
  total: Platform | null;
}) {
  const rows: Array<Platform & { isTotal?: boolean }> = [
    ...platforms,
    ...(total ? [{ ...total, isTotal: true }] : []),
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40">
          <tr>
            <th className="px-4 py-3 text-left font-medium">媒体</th>
            <th className="px-3 py-3 text-right font-medium">今週 応募</th>
            <th className="px-3 py-3 text-right font-medium">先週 応募</th>
            <th className="px-3 py-3 text-right font-medium">先々週 応募</th>
            <th className="px-3 py-3 text-right font-medium">Δ 応募</th>
            <th className="px-3 py-3 text-right font-medium">今週 書類率</th>
            <th className="px-3 py-3 text-right font-medium">先週 書類率</th>
            <th className="px-3 py-3 text-right font-medium">Δ 書類率</th>
            <th className="px-3 py-3 text-right font-medium">今週 内定</th>
            <th className="px-3 py-3 text-right font-medium">先週 内定</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr
              key={p.name}
              className={
                p.isTotal
                  ? "border-t-2 border-zinc-300 bg-zinc-50 font-medium dark:border-zinc-700 dark:bg-zinc-800/50"
                  : "border-t border-zinc-100 dark:border-zinc-800"
              }
            >
              <td className="px-4 py-3 text-left">{p.name}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {fmtNumber(p.apps.current)}
              </td>
              <td className="px-3 py-3 text-right tabular-nums text-zinc-500">
                {fmtNumber(p.apps.lastWeek)}
              </td>
              <td className="px-3 py-3 text-right tabular-nums text-zinc-500">
                {fmtNumber(p.apps.twoWeeksAgo)}
              </td>
              <td className="px-3 py-3 text-right">
                <DeltaCell value={p.apps.delta} />
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {fmtPercent(p.passRate.current)}
              </td>
              <td className="px-3 py-3 text-right tabular-nums text-zinc-500">
                {fmtPercent(p.passRate.lastWeek)}
              </td>
              <td className="px-3 py-3 text-right">
                <DeltaCell value={p.passRate.delta} suffix="pt" />
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {fmtNumber(p.offers.current)}
              </td>
              <td className="px-3 py-3 text-right tabular-nums text-zinc-500">
                {fmtNumber(p.offers.lastWeek)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
