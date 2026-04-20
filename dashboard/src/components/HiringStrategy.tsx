import { HiringFunnelStage, HiringStrategyPhase } from "@/data/frameworks";

const phaseTint: Record<HiringStrategyPhase["key"], string> = {
  pool: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30",
  closing: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
  followup:
    "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
};

function formatCount(n: number | null): string {
  if (n === null) return "—";
  return n.toLocaleString();
}

export function HiringStrategy({
  stages,
  phases,
}: {
  stages: HiringFunnelStage[];
  phases: HiringStrategyPhase[];
}) {
  const stageByKey = new Map(stages.map((s) => [s.key, s]));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
      {/* Left: KPI funnel */}
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-wider text-zinc-500">
          採用活動の KPI（全体像）
        </p>
        <ol className="space-y-1.5">
          {stages.map((s, i) => (
            <li key={s.key} className="flex items-center gap-3 text-xs">
              <span className="w-6 shrink-0 text-right tabular-nums text-zinc-400">
                {i + 1}
              </span>
              <div className="flex flex-1 items-center justify-between rounded border border-zinc-200 px-2.5 py-1.5 dark:border-zinc-800">
                <div>
                  <p className="font-medium">{s.jp}</p>
                  <p className="text-[10px] text-zinc-500">{s.gloss}</p>
                </div>
                <div className="text-right">
                  <p className="tabular-nums text-zinc-700 dark:text-zinc-300">
                    {formatCount(s.current)}
                  </p>
                  <p className="text-[10px] tabular-nums text-zinc-500">
                    目標 {formatCount(s.target)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Right: strategic phases */}
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-wider text-zinc-500">
          打ち手 — 採用施策の全体像
        </p>
        <div className="space-y-3">
          {phases.map((p) => {
            const covered = p.covers
              .map((k) => stageByKey.get(k)?.jp)
              .filter(Boolean)
              .join(" · ");
            return (
              <div
                key={p.key}
                className={`rounded-lg border p-3 ${phaseTint[p.key]}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold">{p.jp}</p>
                  <p className="text-[10px] text-zinc-500">{p.gloss}</p>
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  担当KPI: {covered}
                </p>

                <div className="mt-2 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      定数的要素 (slow-moving)
                    </p>
                    <ul className="mt-0.5 list-disc space-y-0.5 pl-4">
                      {p.fixed.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      変数的要素 (knobs)
                    </p>
                    <ul className="mt-0.5 list-disc space-y-0.5 pl-4">
                      {p.variable.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
