import Link from "next/link";
import { listAnalyses } from "@/lib/analyses";

export default async function AnalysesIndex() {
  const items = await listAnalyses();

  return (
    <main className="mx-auto max-w-4xl px-6 py-8 sm:py-10">
      <header className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            ← ダッシュボード
          </Link>
        </div>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">分析 (Analyses)</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Dated deep-dives into the recruitment data. Each writeup is a standalone answer to a specific question.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">まだ分析はありません。</p>
      ) : (
        <ul className="space-y-4">
          {items.map((a) => (
            <li
              key={a.slug}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <Link href={`/analyses/${a.slug}`} className="block">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {a.title}
                  </h2>
                  {a.date && (
                    <span className="shrink-0 text-xs text-zinc-500 tabular-nums">
                      {a.date}
                    </span>
                  )}
                </div>
                {a.summary && (
                  <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {a.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
