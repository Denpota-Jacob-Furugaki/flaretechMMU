import {
  BrandChecklistCategory,
  BrandContentStatus,
  BrandFreshness,
} from "@/data/frameworks";

const existsStyles: Record<BrandContentStatus, { label: string; className: string }> = {
  unknown: {
    label: "未確認",
    className: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  missing: {
    label: "なし",
    className: "bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
  },
  partial: {
    label: "一部あり",
    className: "bg-amber-200 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
  },
  present: {
    label: "あり",
    className: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
  },
};

const freshStyles: Record<BrandFreshness, { label: string; className: string }> = {
  unknown: {
    label: "未確認",
    className: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  stale: {
    label: "古い",
    className: "bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
  },
  fresh: {
    label: "最新",
    className: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
  },
  na: {
    label: "—",
    className: "bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600",
  },
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  );
}

export function BrandChecklist({ categories }: { categories: BrandChecklistCategory[] }) {
  const counts = {
    present: categories.filter((c) => c.exists === "present").length,
    partial: categories.filter((c) => c.exists === "partial").length,
    missing: categories.filter((c) => c.exists === "missing").length,
    unknown: categories.filter((c) => c.exists === "unknown").length,
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-500">充足状況:</span>
        <Badge className={existsStyles.present.className}>あり {counts.present}</Badge>
        <Badge className={existsStyles.partial.className}>一部 {counts.partial}</Badge>
        <Badge className={existsStyles.missing.className}>なし {counts.missing}</Badge>
        <Badge className={existsStyles.unknown.className}>未確認 {counts.unknown}</Badge>
      </div>

      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.key}
            className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  <span className="mr-1 text-zinc-400">{c.number}.</span>
                  {c.category}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{c.overview}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-zinc-500">存在</span>
                  <Badge className={existsStyles[c.exists].className}>
                    {existsStyles[c.exists].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-zinc-500">鮮度</span>
                  <Badge className={freshStyles[c.fresh].className}>
                    {freshStyles[c.fresh].label}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                コンテンツタイトル例
              </p>
              <ul className="mt-0.5 flex flex-wrap gap-1.5">
                {c.contentExamples.map((ex, i) => (
                  <li
                    key={i}
                    className="rounded bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400"
                  >
                    「{ex}」
                  </li>
                ))}
              </ul>
            </div>

            {c.note && (
              <p className="mt-2 text-[11px] italic text-zinc-500">
                Flaretech: {c.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
