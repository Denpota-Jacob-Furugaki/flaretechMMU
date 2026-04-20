import { WeeklyPoint } from "@/lib/types";
import { fmtNumber, fmtPercent } from "@/lib/format";

const W = 900;
const H = 240;
const PAD = { top: 20, right: 40, bottom: 36, left: 48 };

export function WeeklyTrend({ data }: { data: WeeklyPoint[] }) {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        週次データなし
      </div>
    );
  }

  const xs = data.map((_, i) => i);
  const ys = data.map((d) => d.applications);
  const yMax = Math.max(...ys) * 1.1;
  const yMin = 0;

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (i: number) =>
    xs.length > 1 ? PAD.left + (i / (xs.length - 1)) * plotW : PAD.left + plotW / 2;
  const y = (v: number) =>
    PAD.top + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.applications).toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${x(data.length - 1).toFixed(1)} ${(PAD.top + plotH).toFixed(1)} L ${x(0).toFixed(1)} ${(PAD.top + plotH).toFixed(1)} Z`;

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) => (yMax / yTicks) * i);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">週次トレンド — 総応募数</h3>
        <div className="text-xs text-zinc-500">
          {data.length}週 · 最新 {data[data.length - 1].week} /{" "}
          {fmtNumber(data[data.length - 1].applications)}件
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-60 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="weekly applications trend"
      >
        {tickValues.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 8}
              y={y(t)}
              textAnchor="end"
              dominantBaseline="central"
              className="fill-zinc-500 text-[10px]"
            >
              {Math.round(t)}
            </text>
          </g>
        ))}

        <path d={areaPath} className="fill-blue-500/10" />
        <path
          d={linePath}
          className="stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {data.map((d, i) => (
          <g key={d.week}>
            <circle
              cx={x(i)}
              cy={y(d.applications)}
              r="3"
              className="fill-blue-600 dark:fill-blue-400"
            />
            {(i === 0 || i === data.length - 1 || i % 3 === 0) && (
              <text
                x={x(i)}
                y={H - PAD.bottom + 16}
                textAnchor="middle"
                className="fill-zinc-500 text-[10px]"
              >
                {d.week}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
        <div>
          <div className="font-medium text-zinc-700 dark:text-zinc-300">ピーク週</div>
          {(() => {
            const peak = data.reduce((a, b) => (b.applications > a.applications ? b : a));
            return (
              <div className="tabular-nums">
                {peak.week} · {fmtNumber(peak.applications)}件
              </div>
            );
          })()}
        </div>
        <div>
          <div className="font-medium text-zinc-700 dark:text-zinc-300">最新 書類通過率</div>
          <div className="tabular-nums">
            {fmtPercent(data[data.length - 1].passRate)}
          </div>
        </div>
        <div>
          <div className="font-medium text-zinc-700 dark:text-zinc-300">累計 応募</div>
          <div className="tabular-nums">
            {fmtNumber(data.reduce((s, d) => s + d.applications, 0))}件
          </div>
        </div>
      </div>
    </div>
  );
}
