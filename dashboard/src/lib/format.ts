export function fmtNumber(n: number | null | undefined, digits = 0): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toLocaleString("ja-JP", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtPercent(n: number | null | undefined, digits = 1): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}

export function fmtDelta(
  n: number | null | undefined,
  suffix = "",
): { text: string; kind: "up" | "down" | "flat" | "none" } {
  if (n === null || n === undefined || Number.isNaN(n)) {
    return { text: "—", kind: "none" };
  }
  if (n === 0) return { text: `±0${suffix}`, kind: "flat" };
  const arrow = n > 0 ? "▲" : "▼";
  return {
    text: `${arrow}${Math.abs(n)}${suffix}`,
    kind: n > 0 ? "up" : "down",
  };
}

export function deltaClass(kind: "up" | "down" | "flat" | "none"): string {
  switch (kind) {
    case "up":
      return "text-emerald-600 dark:text-emerald-400";
    case "down":
      return "text-rose-600 dark:text-rose-400";
    case "flat":
      return "text-zinc-500";
    default:
      return "text-zinc-400";
  }
}
