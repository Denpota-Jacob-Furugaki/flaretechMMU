import Link from "next/link";
import { notFound } from "next/navigation";
import {
  analysisSlugs,
  readAnalysis,
  SECTION_LABELS,
} from "@/lib/analyses";
import { Markdown } from "@/components/Markdown";

export async function generateStaticParams() {
  const slugs = await analysisSlugs();
  return slugs.map((slug) => ({ slug }));
}

const SECTION_ROUTE: Record<string, string> = {
  status: "/",
  market: "/market",
  diagnosis: "/diagnosis",
  experience: "/experience",
  retention: "/retention",
};

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const analysis = await readAnalysis(slug);
  if (!analysis) notFound();

  const relatedSection = analysis.meta.relatesTo;

  return (
    <main className="mx-auto max-w-4xl px-6 py-8 sm:py-10">
      <header className="mb-6 flex flex-col gap-3 border-b border-zinc-200 pb-4 text-xs dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Link
            href="/"
            className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            ← ダッシュボード
          </Link>
          <Link
            href="/analyses"
            className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            ← 分析一覧
          </Link>
        </div>

        {relatedSection && SECTION_ROUTE[relatedSection] && (
          <Link
            href={SECTION_ROUTE[relatedSection]}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:border-rose-800 dark:hover:bg-rose-900/30"
          >
            <span className="text-[10px] uppercase tracking-wider opacity-70">
              関連セクション
            </span>
            <span>{SECTION_LABELS[relatedSection]}</span>
            <span aria-hidden>→</span>
          </Link>
        )}
      </header>

      <article>
        <Markdown>{analysis.body}</Markdown>
      </article>
    </main>
  );
}
