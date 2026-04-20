import { OfferDeclineReason, OfferDeclineRisk } from "@/data/frameworks";

const riskStyles: Record<OfferDeclineRisk, { label: string; className: string }> = {
  unknown: {
    label: "未計測",
    className: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  low: {
    label: "low",
    className: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
  },
  medium: {
    label: "medium",
    className: "bg-amber-200 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
  },
  high: {
    label: "high",
    className: "bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
  },
};

export function OfferDecline({ reasons }: { reasons: OfferDeclineReason[] }) {
  return (
    <div className="space-y-3">
      {reasons.map((r, i) => (
        <div
          key={r.key}
          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="flex items-start gap-2 text-sm font-medium">
                <span className="shrink-0 text-rose-500">★</span>
                <span>
                  <span className="mr-1 text-zinc-400">{i + 1}.</span>
                  {r.label}
                </span>
              </p>
              <p className="mt-0.5 pl-5 text-[11px] text-zinc-500">{r.gloss}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${riskStyles[r.flaretechRisk].className}`}
            >
              {riskStyles[r.flaretechRisk].label}
            </span>
          </div>

          {r.hypothesis && (
            <p className="mt-2 pl-5 text-[11px] italic text-zinc-600 dark:text-zinc-400">
              仮説: {r.hypothesis}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
