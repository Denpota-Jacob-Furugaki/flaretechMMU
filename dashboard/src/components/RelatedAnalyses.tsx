import Link from "next/link";
import { listAnalyses, SectionKey } from "@/lib/analyses";

export async function RelatedAnalyses({
  section,
}: {
  section: SectionKey;
}) {
  const items = await listAnalyses({ section });
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-4 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40">
        このセクションに関連する分析レポートはまだありません。
        <Link
          href="/analyses"
          className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
        >
          分析一覧を見る →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">
          🔗 関連分析 ({items.length} 件)
        </h3>
        <Link
          href="/analyses"
          className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          全体一覧 →
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/analyses/${a.slug}`}
              className="group block h-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {a.title}
                </h4>
                {a.date && (
                  <span className="shrink-0 text-[11px] tabular-nums text-zinc-500">
                    {a.date}
                  </span>
                )}
              </div>
              {a.summary && (
                <p className="mt-2 line-clamp-3 text-xs text-zinc-600 dark:text-zinc-400">
                  {a.summary}
                </p>
              )}
              <div className="mt-3 text-[11px] text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                続きを読む →
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
