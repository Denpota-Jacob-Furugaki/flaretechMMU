import Link from "next/link";

export function SectionCard({
  href,
  number,
  title,
  titleEn,
  description,
  preview,
  analysisCount,
}: {
  href: string;
  number: string;
  title: string;
  titleEn: string;
  description: string;
  preview?: string | null;
  analysisCount?: number;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          {number} {titleEn}
        </span>
        <span className="text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
          →
        </span>
      </div>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {preview && (
        <div className="mt-3 rounded-lg border border-blue-200/70 bg-blue-50/40 p-3 dark:border-blue-900/50 dark:bg-blue-900/10">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            💡 次の一手
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-700 dark:text-zinc-200">
            {preview}
          </p>
        </div>
      )}
      {typeof analysisCount === "number" && analysisCount > 0 && (
        <div className="mt-3 flex items-center gap-1 text-[11px] text-zinc-500">
          <span>🔗</span>
          <span>関連分析 {analysisCount} 件</span>
        </div>
      )}
    </Link>
  );
}
