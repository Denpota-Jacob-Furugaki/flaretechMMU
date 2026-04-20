import { Mover } from "@/lib/types";
import { deltaClass, fmtDelta, fmtNumber } from "@/lib/format";

export function MoversCard({
  title,
  kind,
  movers,
}: {
  title: string;
  kind: "best" | "worst";
  movers: Mover[];
}) {
  const accent =
    kind === "best"
      ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-900/10"
      : "border-rose-200 bg-rose-50/40 dark:border-rose-900/50 dark:bg-rose-900/10";

  return (
    <div className={`rounded-xl border p-5 shadow-sm ${accent}`}>
      <div className="mb-3 text-sm font-semibold">{title}</div>
      <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
        {movers.map((m) => {
          const d = fmtDelta(m.delta);
          return (
            <li key={m.name} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-xs text-zinc-500 tabular-nums">
                  {fmtNumber(m.current)} ← {fmtNumber(m.lastWeek)}
                </div>
              </div>
              <div className={`text-sm font-semibold tabular-nums ${deltaClass(d.kind)}`}>
                {d.text}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
