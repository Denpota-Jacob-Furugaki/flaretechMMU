import { ReputationCompany } from "@/data/frameworks";

const W = 720;
const H = 320;
const PAD = { top: 24, right: 140, bottom: 44, left: 52 };

const X_MIN = 0;
const X_MAX = 70000;
const Y_MIN = 3.0;
const Y_MAX = 5.0;
const R_MIN = 6;
const R_MAX = 24;

const X_TICKS = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000];
const Y_TICKS = [3.0, 3.5, 4.0, 4.5, 5.0];

export function ReputationBubble({ data }: { data: ReputationCompany[] }) {
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (v: number) =>
    PAD.left +
    (Math.max(X_MIN, Math.min(X_MAX, v)) - X_MIN) * (plotW / (X_MAX - X_MIN));
  const y = (v: number) =>
    PAD.top +
    plotH -
    (Math.max(Y_MIN, Math.min(Y_MAX, v)) - Y_MIN) * (plotH / (Y_MAX - Y_MIN));

  const maxReview = Math.max(...data.map((d) => d.reviewCount));
  const r = (n: number) =>
    R_MIN + (Math.sqrt(n) / Math.sqrt(maxReview || 1)) * (R_MAX - R_MIN);

  return (
    <div className="space-y-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-80 w-full"
        role="img"
        aria-label="評判と認知度のバブルマップ"
      >
        {/* 4.0 threshold line */}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={y(4.0)}
          y2={y(4.0)}
          stroke="#ef4444"
          strokeDasharray="4 4"
          strokeWidth={1}
        />
        <text
          x={W - PAD.right - 4}
          y={y(4.0) - 4}
          textAnchor="end"
          className="fill-rose-500 text-[10px]"
        >
          大きな壁 (評価 4.0)
        </text>

        {/* Y gridlines + labels */}
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={y(t)}
              textAnchor="end"
              dominantBaseline="central"
              className="fill-zinc-500 text-[10px]"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}

        {/* X ticks */}
        {X_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={x(t)}
              x2={x(t)}
              y1={PAD.top}
              y2={H - PAD.bottom}
              className="stroke-zinc-100 dark:stroke-zinc-900"
              strokeWidth={1}
            />
            <text
              x={x(t)}
              y={H - PAD.bottom + 14}
              textAnchor="middle"
              className="fill-zinc-500 text-[10px]"
            >
              {t >= 1000 ? `${(t / 1000).toFixed(0)}k` : t}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={(PAD.left + (W - PAD.right)) / 2}
          y={H - 6}
          textAnchor="middle"
          className="fill-zinc-500 text-[11px]"
        >
          → 認知度 (クチコミ件数)
        </text>
        <text
          x={-H / 2}
          y={14}
          transform={`rotate(-90)`}
          textAnchor="middle"
          className="fill-zinc-500 text-[11px]"
        >
          ↑ 口コミ評価 (5点満点)
        </text>

        {/* Bubbles */}
        {data.map((d) => {
          const cx = x(d.awareness);
          const cy = y(d.reputation);
          const radius = r(d.reviewCount);
          const fill = d.isSelf
            ? "#ef4444"
            : d.unknown
              ? "#94a3b8"
              : "#10b981";
          const opacity = d.isSelf ? 0.9 : 0.55;
          return (
            <g key={d.name}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={fill}
                fillOpacity={opacity}
                stroke={d.isSelf ? "#b91c1c" : "#475569"}
                strokeWidth={d.isSelf ? 2 : 1}
              />
              <text
                x={cx}
                y={cy - radius - 4}
                textAnchor="middle"
                className="fill-zinc-700 text-[10px] dark:fill-zinc-300"
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-center gap-4 text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          自社 (Flaretech)
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 opacity-60" />
          競合
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-400 opacity-60" />
          プレースホルダー (実測待ち)
        </span>
      </div>
    </div>
  );
}
