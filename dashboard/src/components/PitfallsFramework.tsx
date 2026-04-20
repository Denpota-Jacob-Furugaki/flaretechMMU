import { PitfallCause, PitfallSeverity } from "@/data/frameworks";

const severityStyles: Record<PitfallSeverity, { label: string; className: string }> = {
  unknown: {
    label: "未診断",
    className: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  low: {
    label: "low",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  medium: {
    label: "medium",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  high: {
    label: "high",
    className: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
};

export function PitfallsFramework({ causes }: { causes: PitfallCause[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {causes.map((cause) => (
        <div
          key={cause.id}
          className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <div className="mb-3">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              原因 {cause.id}
            </p>
            <p className="mt-1 text-sm font-medium">{cause.label}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{cause.gloss}</p>
          </div>
          <ul className="space-y-2">
            {cause.pitfalls.map((p) => {
              const sev = severityStyles[p.severity];
              return (
                <li
                  key={p.id}
                  className="flex items-start gap-3 rounded-md bg-zinc-50 p-2.5 dark:bg-zinc-900/60"
                >
                  <span className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums text-zinc-500">
                    ワナ{p.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{p.label}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{p.gloss}</p>
                    {p.note && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                        {p.note}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${sev.className}`}
                  >
                    {sev.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
