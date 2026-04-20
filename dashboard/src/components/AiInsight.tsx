import { InsightBlock } from "@/lib/ai-insights";

export function AiInsight({
  insight,
  variant = "default",
}: {
  insight: InsightBlock | undefined | null;
  variant?: "default" | "compact";
}) {
  if (!insight) return null;

  return (
    <aside
      className={`rounded-xl border border-blue-200/70 bg-blue-50/40 p-4 text-sm shadow-sm dark:border-blue-900/50 dark:bg-blue-900/10 ${
        variant === "compact" ? "mt-3" : "mt-4"
      }`}
      role="note"
      aria-label="AI 考察"
    >
      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
        <span aria-hidden>💡</span>
        <span>AI 考察</span>
      </div>
      <p className="text-zinc-700 dark:text-zinc-200">{insight.body}</p>
      {insight.next_move && (
        <div className="mt-3 border-t border-blue-200/60 pt-3 dark:border-blue-900/40">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700/80 dark:text-blue-300/80">
            次の一手
          </div>
          <p className="mt-1 text-zinc-700 dark:text-zinc-200">
            {insight.next_move}
          </p>
        </div>
      )}
    </aside>
  );
}
