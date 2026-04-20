import Link from "next/link";
import { SECTION_LABELS, SectionKey } from "@/lib/analyses";

const SECTION_ORDER: SectionKey[] = [
  "status",
  "market",
  "diagnosis",
  "experience",
  "retention",
];

const SECTION_ROUTE: Record<SectionKey, string> = {
  status: "/",
  market: "/market",
  diagnosis: "/diagnosis",
  experience: "/experience",
  retention: "/retention",
};

const SECTION_NUMBER: Record<SectionKey, string> = {
  status: "①",
  market: "②",
  diagnosis: "③",
  experience: "④",
  retention: "⑤",
};

export function SectionNav({ current }: { current: SectionKey }) {
  const i = SECTION_ORDER.indexOf(current);
  const prev = i > 0 ? SECTION_ORDER[i - 1] : null;
  const next = i >= 0 && i < SECTION_ORDER.length - 1 ? SECTION_ORDER[i + 1] : null;

  return (
    <nav className="mb-6 flex flex-col gap-3 border-b border-zinc-200 pb-4 text-xs dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-zinc-600 dark:text-zinc-400">
        <Link
          href="/"
          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          ← ダッシュボード
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {SECTION_NUMBER[current]} {SECTION_LABELS[current]}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {prev && (
          <Link
            href={SECTION_ROUTE[prev]}
            className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-zinc-600 shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
          >
            ← {SECTION_NUMBER[prev]} {SECTION_LABELS[prev]}
          </Link>
        )}
        {next && (
          <Link
            href={SECTION_ROUTE[next]}
            className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-zinc-600 shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
          >
            {SECTION_NUMBER[next]} {SECTION_LABELS[next]} →
          </Link>
        )}
        <Link
          href="/analyses"
          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium text-zinc-700 shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          分析一覧 →
        </Link>
      </div>
    </nav>
  );
}
