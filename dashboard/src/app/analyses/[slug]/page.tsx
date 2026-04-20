import Link from "next/link";
import { notFound } from "next/navigation";
import { analysisSlugs, readAnalysis } from "@/lib/analyses";
import { Markdown } from "@/components/Markdown";

export async function generateStaticParams() {
  const slugs = await analysisSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const analysis = await readAnalysis(slug);
  if (!analysis) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-8 sm:py-10">
      <header className="mb-8 text-xs font-medium uppercase tracking-wider text-zinc-500">
        <Link href="/analyses" className="hover:text-zinc-700 dark:hover:text-zinc-300">
          ← 分析一覧
        </Link>
      </header>
      <article>
        <Markdown>{analysis.body}</Markdown>
      </article>
    </main>
  );
}
