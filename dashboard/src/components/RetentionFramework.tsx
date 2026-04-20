import { RetentionChallenge } from "@/data/frameworks";

export function RetentionFramework({
  challenges,
}: {
  challenges: RetentionChallenge[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
          企業イメージアップ
        </div>
        <p className="text-xs text-zinc-500">
          → 下の 5 つの人事課題を間接的に解決する。採用広報の役割は「入社して終わり」ではない。
        </p>
      </div>

      <div className="space-y-4">
        {challenges.map((c) => (
          <div
            key={c.key}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-base font-semibold">{c.jp}</p>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                {c.gloss}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
              <div className="rounded border border-emerald-200 bg-emerald-50 p-2 dark:border-emerald-900 dark:bg-emerald-950/20">
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  強いイメージの効果
                </p>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-zinc-700 dark:text-zinc-300">
                  {c.strongImage.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded border border-rose-200 bg-rose-50 p-2 dark:border-rose-900 dark:bg-rose-950/20">
                <p className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  弱いイメージのリスク
                </p>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-zinc-700 dark:text-zinc-300">
                  {c.weakImage.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <span className="font-semibold">他の人事課題を間接的に解決する</span>
        {" — 採用広報で企業イメージを上げることが、育成・配置・評価・報酬・代謝のすべての人事課題を下支えする。"}
      </div>
    </div>
  );
}
