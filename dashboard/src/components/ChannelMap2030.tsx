import {
  ChannelTier,
  ChannelUsage,
  RecruitmentChannel2030,
} from "@/data/frameworks";

const tierStyles: Record<ChannelTier, { bg: string; border: string; label: string }> = {
  traditional: {
    bg: "bg-zinc-100 dark:bg-zinc-900",
    border: "border-zinc-300 dark:border-zinc-700",
    label: "Traditional",
  },
  "tech-augmented": {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-900",
    label: "Tech-augmented (検索エンジン + ATS)",
  },
  emerging: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-900",
    label: "Emerging (Direct / Matching)",
  },
};

const usageStyles: Record<ChannelUsage, string> = {
  unknown: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  active: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
  gap: "bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
  "not-applicable":
    "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500",
};

export function ChannelMap2030({
  channels,
}: {
  channels: RecruitmentChannel2030[];
}) {
  const tiers: ChannelTier[] = ["traditional", "tech-augmented", "emerging"];

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          → 2030
        </span>
        {tiers.map((t) => (
          <span
            key={t}
            className={`rounded-full border px-2 py-0.5 text-zinc-600 dark:text-zinc-300 ${tierStyles[t].bg} ${tierStyles[t].border}`}
          >
            {tierStyles[t].label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {tiers.map((tier) => {
          const items = channels.filter((c) => c.tier === tier);
          return (
            <div key={tier} className="space-y-2">
              {items.map((c) => (
                <div
                  key={c.key}
                  className={`rounded-md border p-3 ${tierStyles[c.tier].bg} ${tierStyles[c.tier].border}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{c.label}</p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${usageStyles[c.flaretechUse]}`}
                    >
                      {c.flaretechUse}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{c.gloss}</p>
                  {c.note && (
                    <p className="mt-1 text-xs italic text-zinc-600 dark:text-zinc-400">
                      {c.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
