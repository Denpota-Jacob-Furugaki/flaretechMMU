import { ValueStyle } from "@/data/frameworks";

const tint: Record<ValueStyle["key"], string> = {
  business: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
  culture: "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30",
  job: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
  action: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30",
};

export function ValueStyles({ styles }: { styles: ValueStyle[] }) {
  const order: ValueStyle["key"][] = ["business", "culture", "job", "action"];
  const byKey = new Map(styles.map((s) => [s.key, s]));

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 grid grid-cols-2 text-[10px] uppercase tracking-wider text-zinc-500">
          <span>会社軸 · Company</span>
          <span className="text-right">会社軸 · Company</span>
        </div>
        {order.map((k) => {
          const s = byKey.get(k);
          if (!s) return null;
          return (
            <div key={s.key} className={`rounded-lg border p-4 ${tint[s.key]}`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">
                  {s.english}{" "}
                  <span className="font-normal text-zinc-500">（{s.japanese}）</span>
                </p>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                  {s.axis}軸
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">「{s.styleLabel}」</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-700 dark:text-zinc-300">
                {s.prompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {s.evidence && (
                <p className="mt-2 text-xs italic text-zinc-500">{s.evidence}</p>
              )}
            </div>
          );
        })}
        <div className="col-span-2 grid grid-cols-2 text-[10px] uppercase tracking-wider text-zinc-500">
          <span>個人軸 · Individual</span>
          <span className="text-right">個人軸 · Individual</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-md">
          Style（価値観）
        </div>
      </div>
    </div>
  );
}
