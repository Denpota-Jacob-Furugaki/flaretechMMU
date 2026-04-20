import { mission } from "@/data/mission";
import { fmtNumber } from "@/lib/format";

function fmt(n: number): string {
  return fmtNumber(n);
}

export function MissionHero() {
  const m = mission;
  const achievementPct = Math.round(
    (m.target.currentMonthlyAvg / m.target.monthlyHires) * 100,
  );
  const gap = m.target.monthlyHires - m.target.currentMonthlyAvg;
  const barPct = Math.min(achievementPct, 100);

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-white shadow-sm dark:border-rose-900/50 dark:from-rose-950/40 dark:via-zinc-950 dark:to-zinc-950">
      <div className="p-6 sm:p-8">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          {m.eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{m.headline}</h2>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          {m.sub}
        </p>

        {/* Gap visualization */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="rounded-xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-baseline justify-between text-xs text-zinc-500">
              <span>現状: 月 {fmt(m.target.currentMonthlyAvg)} 件</span>
              <span>目標: 月 {fmt(m.target.monthlyHires)} 件</span>
            </div>
            <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-rose-500"
                style={{ width: `${barPct}%` }}
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  達成率
                </div>
                <div className="text-2xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
                  {achievementPct}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  目標まで / 月
                </div>
                <div className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                  ▲ {fmt(gap)} 件
                </div>
                <div className="text-[11px] text-zinc-500">
                  (目標は {m.target.gapMultiplier} 倍以上)
                </div>
              </div>
            </div>
          </div>

          {/* Cumulative numbers */}
          <div className="rounded-xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">
              直近 {m.cumulative.weeks} 週 累計
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3">
              <div>
                <div className="text-[11px] text-zinc-500">応募</div>
                <div className="text-2xl font-bold tabular-nums">
                  {fmt(m.cumulative.applications)}
                </div>
                <div className="text-[11px] text-zinc-500">件</div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500">書類通過</div>
                <div className="text-2xl font-bold tabular-nums">
                  {fmt(m.cumulative.docPass)}
                </div>
                <div className="text-[11px] text-zinc-500">
                  ({((m.cumulative.docPass / m.cumulative.applications) * 100).toFixed(1)}%)
                </div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500">内定承諾</div>
                <div className="text-2xl font-bold tabular-nums">
                  {fmt(m.cumulative.offers)}
                </div>
                <div className="text-[11px] text-zinc-500">
                  ({((m.cumulative.offers / m.cumulative.applications) * 100).toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scope A/B/C */}
        <div className="mt-6">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            ご提案いただきたい領域
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {m.scopes.map((s) => (
              <ScopeCard key={s.key} scope={s} />
            ))}
          </div>
        </div>

        {/* Footer notes */}
        <div className="mt-6 flex flex-col gap-2 border-t border-zinc-200/70 pt-4 text-[11px] text-zinc-500 dark:border-zinc-800/70 sm:flex-row sm:items-center sm:gap-6">
          <div>
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">
              対象外:
            </span>{" "}
            {m.outOfScope}
          </div>
          <div>
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">
              制約:
            </span>{" "}
            {m.brandConstraint}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScopeCard({ scope }: { scope: (typeof mission)["scopes"][number] }) {
  const accent = {
    A: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30",
    B: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
    C: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
  }[scope.key];

  const chipAccent = {
    A: "bg-sky-500 text-white",
    B: "bg-amber-500 text-white",
    C: "bg-emerald-500 text-white",
  }[scope.key];

  return (
    <div className={`rounded-xl border p-4 ${accent}`}>
      <div className="flex items-baseline gap-2">
        <span
          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${chipAccent}`}
        >
          {scope.key}
        </span>
        <h3 className="text-sm font-semibold">{scope.title}</h3>
      </div>
      <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {scope.headline}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-700 dark:text-zinc-300">
        {scope.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
