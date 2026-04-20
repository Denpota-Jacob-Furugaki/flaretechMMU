import Link from "next/link";
import data from "@/data/dashboard.json";
import { DashboardData } from "@/lib/types";
import { KpiCard } from "@/components/KpiCard";
import { WeeklyTrend } from "@/components/WeeklyTrend";
import { PlatformTable } from "@/components/PlatformTable";
import { MoversCard } from "@/components/MoversCard";
import { listAnalyses } from "@/lib/analyses";

const d = data as DashboardData;

export default async function Home() {
  const analyses = await listAnalyses();

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Flaretech · Media Marketing Unit
          </div>
          <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
            経営向け 週次サマリー (WoW)
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {d.period}
          </p>
        </div>
        <Link
          href="/analyses"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          分析一覧
          {analyses.length > 0 && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs tabular-nums text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {analyses.length}
            </span>
          )}
          <span aria-hidden>→</span>
        </Link>
      </header>

      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {d.kpis.map((kpi) => (
            <KpiCard key={kpi.name} kpi={kpi} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <WeeklyTrend data={d.weekly} />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          媒体別 3週比較
        </h2>
        <PlatformTable platforms={d.platforms} total={d.total} />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          今週のベスト / ワースト (応募数 WoW)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <MoversCard
            title="🟢 ベスト 3 (応募数 増加)"
            kind="best"
            movers={d.best}
          />
          <MoversCard
            title="🔴 ワースト 3 (応募数 減少)"
            kind="worst"
            movers={d.worst}
          />
        </div>
      </section>

      <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        Source: <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">{d.sourceFile}</code>
        {" · "}
        Static snapshot — rebuild to refresh.
      </footer>
    </main>
  );
}
