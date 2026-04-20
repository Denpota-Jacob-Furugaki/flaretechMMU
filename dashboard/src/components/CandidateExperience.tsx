import { CandidateExperienceCategory, CxScore } from "@/data/frameworks";

function scoreColor(score: CxScore): string {
  if (score < 0) return "bg-zinc-300 dark:bg-zinc-700";
  if (score <= 1) return "bg-rose-500";
  if (score <= 2) return "bg-amber-500";
  if (score <= 3) return "bg-yellow-500";
  if (score <= 4) return "bg-lime-500";
  return "bg-emerald-500";
}

function scoreLabel(score: CxScore): string {
  if (score < 0) return "未計測";
  return `${score} / 5`;
}

function ScoreBar({ score }: { score: CxScore }) {
  const pct = score < 0 ? 0 : (score / 5) * 100;
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div
        className={`h-full rounded-full ${scoreColor(score)}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function CandidateExperience({
  categories,
}: {
  categories: CandidateExperienceCategory[];
}) {
  const measured = categories.filter((c) => c.flaretechScore >= 0);
  const avg =
    measured.length > 0
      ? measured.reduce((s, c) => s + (c.flaretechScore as number), 0) /
        measured.length
      : null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 text-xs">
        <p className="text-zinc-500">
          各カテゴリで「良い候補者エクスペリエンス」にどれだけ近いかを 0-5 で採点。
        </p>
        <p className="text-zinc-500">
          計測済み: <span className="tabular-nums">{measured.length}</span> /{" "}
          <span className="tabular-nums">{categories.length}</span>
          {avg !== null && (
            <>
              {" · 平均 "}
              <span className="font-semibold tabular-nums text-zinc-800 dark:text-zinc-200">
                {avg.toFixed(1)}
              </span>
              {" / 5"}
            </>
          )}
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((c) => (
          <div
            key={c.key}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold">{c.category}</p>
              <div className="w-40 shrink-0">
                <div className="flex items-center gap-2">
                  <ScoreBar score={c.flaretechScore} />
                  <span className="w-12 shrink-0 text-right text-[10px] tabular-nums text-zinc-600 dark:text-zinc-400">
                    {scoreLabel(c.flaretechScore)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
              <div className="rounded border border-emerald-200 bg-emerald-50 p-2 dark:border-emerald-900 dark:bg-emerald-950/20">
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  良い体験の特徴
                </p>
                <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{c.good}</p>
              </div>
              <div className="rounded border border-rose-200 bg-rose-50 p-2 dark:border-rose-900 dark:bg-rose-950/20">
                <p className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  悪い体験の特徴
                </p>
                <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{c.bad}</p>
              </div>
            </div>

            {c.note && (
              <p className="mt-2 text-[11px] italic text-zinc-500">暫定: {c.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
