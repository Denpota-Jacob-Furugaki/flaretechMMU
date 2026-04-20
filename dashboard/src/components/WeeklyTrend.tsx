"use client";

import { useMemo, useState } from "react";
import { WeeklyPoint, WeeklyPointLong } from "@/lib/types";
import { fmtNumber, fmtPercent } from "@/lib/format";

const W = 900;
const H = 240;
const PAD = { top: 20, right: 40, bottom: 40, left: 48 };

type RangeKey = "4w" | "12w" | "26w" | "52w" | "all";

const RANGES: { key: RangeKey; label: string; weeks: number | null }[] = [
  { key: "4w", label: "4週", weeks: 4 },
  { key: "12w", label: "12週", weeks: 12 },
  { key: "26w", label: "26週", weeks: 26 },
  { key: "52w", label: "52週", weeks: 52 },
  { key: "all", label: "全期間", weeks: null },
];

interface NormalizedPoint {
  label: string; // e.g. "04/10" or "2024/01"
  fullLabel: string; // tooltip / detailed label
  weekKey: string; // unique key per week
  applications: number;
  passRate: number | null;
  offers: number | null;
  yearTick: string | null; // first week of a new year → "2024"
}

function normalizeLong(data: WeeklyPointLong[]): NormalizedPoint[] {
  let prevYear: string | null = null;
  return data.map((p) => {
    const [y, m, d] = p.weekStart.split("-");
    const yearTick = y !== prevYear ? y : null;
    prevYear = y;
    return {
      label: `${m}/${d}`,
      fullLabel: p.weekStart,
      weekKey: p.weekStart,
      applications: p.applications,
      passRate: p.passRate,
      offers: p.offers,
      yearTick,
    };
  });
}

function normalizeShort(data: WeeklyPoint[]): NormalizedPoint[] {
  return data.map((p) => ({
    label: p.week,
    fullLabel: p.week,
    weekKey: p.week,
    applications: p.applications,
    passRate: p.passRate,
    offers: p.offers,
    yearTick: null,
  }));
}

export function WeeklyTrend({
  data,
  dataLong,
}: {
  data: WeeklyPoint[];
  dataLong?: WeeklyPointLong[];
}) {
  const hasLong = !!dataLong && dataLong.length > 0;
  const [range, setRange] = useState<RangeKey>(hasLong ? "26w" : "all");

  const all = useMemo<NormalizedPoint[]>(
    () => (hasLong ? normalizeLong(dataLong!) : normalizeShort(data)),
    [data, dataLong, hasLong],
  );

  const displayed = useMemo<NormalizedPoint[]>(() => {
    const weeks = RANGES.find((r) => r.key === range)?.weeks;
    if (weeks === null || weeks === undefined) return all;
    return all.slice(-weeks);
  }, [all, range]);

  if (displayed.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        週次データなし
      </div>
    );
  }

  const xs = displayed.map((_, i) => i);
  const ys = displayed.map((p) => p.applications);
  const yMax = Math.max(...ys, 1) * 1.1;
  const yMin = 0;

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (i: number) =>
    xs.length > 1 ? PAD.left + (i / (xs.length - 1)) * plotW : PAD.left + plotW / 2;
  const y = (v: number) =>
    PAD.top + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

  const linePath = displayed
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.applications).toFixed(1)}`,
    )
    .join(" ");

  const areaPath = `${linePath} L ${x(displayed.length - 1).toFixed(1)} ${(
    PAD.top + plotH
  ).toFixed(1)} L ${x(0).toFixed(1)} ${(PAD.top + plotH).toFixed(1)} Z`;

  const yTicks = 4;
  const tickValues = Array.from(
    { length: yTicks + 1 },
    (_, i) => (yMax / yTicks) * i,
  );

  const peak = displayed.reduce((a, b) =>
    b.applications > a.applications ? b : a,
  );
  const cumulative = displayed.reduce((s, p) => s + p.applications, 0);
  const lastPoint = displayed[displayed.length - 1];

  // Pick a reasonable label density: at most ~12 labels across the x-axis.
  const labelEvery = Math.max(1, Math.ceil(displayed.length / 12));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-sm font-semibold">週次トレンド ― 総応募数</h3>
        <div className="flex items-center gap-2">
          <div
            role="tablist"
            aria-label="期間"
            className="flex gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-0.5 text-[11px] dark:border-zinc-800 dark:bg-zinc-900"
          >
            {RANGES.map((r) => {
              const active = r.key === range;
              const disabled = !hasLong && r.key !== "all";
              return (
                <button
                  key={r.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  disabled={disabled}
                  onClick={() => setRange(r.key)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    active
                      ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                      : disabled
                        ? "text-zinc-400 dark:text-zinc-600"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-zinc-500">
            {displayed.length} 週 ・ 最新 {lastPoint.fullLabel}：
            {fmtNumber(lastPoint.applications)} 件
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-60 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="週次 応募数 トレンド"
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

        {/* Year-change vertical gridlines */}
        {displayed.map((p, i) =>
          p.yearTick && i > 0 ? (
            <g key={`year-${i}`}>
              <line
                x1={x(i)}
                x2={x(i)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                className="stroke-rose-300 dark:stroke-rose-900"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={x(i)}
                y={PAD.top - 4}
                textAnchor="middle"
                className="fill-rose-600 text-[10px] font-semibold dark:fill-rose-400"
              >
                {p.yearTick}
              </text>
            </g>
          ) : null,
        )}

        <path d={areaPath} className="fill-blue-500/10" />
        <path
          d={linePath}
          className="stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {displayed.map((p, i) => (
          <g key={p.weekKey}>
            <circle
              cx={x(i)}
              cy={y(p.applications)}
              r={displayed.length > 60 ? 1.5 : 3}
              className="fill-blue-600 dark:fill-blue-400"
            />
            {(i === 0 ||
              i === displayed.length - 1 ||
              i % labelEvery === 0) && (
              <text
                x={x(i)}
                y={H - PAD.bottom + 16}
                textAnchor="middle"
                className="fill-zinc-500 text-[10px]"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
        <div>
          <div className="font-medium text-zinc-700 dark:text-zinc-300">
            ピーク週
          </div>
          <div className="tabular-nums">
            {peak.fullLabel} ・ {fmtNumber(peak.applications)} 件
          </div>
        </div>
        <div>
          <div className="font-medium text-zinc-700 dark:text-zinc-300">
            最新 書類通過率
          </div>
          <div className="tabular-nums">{fmtPercent(lastPoint.passRate)}</div>
        </div>
        <div>
          <div className="font-medium text-zinc-700 dark:text-zinc-300">
            表示範囲 累計 応募
          </div>
          <div className="tabular-nums">{fmtNumber(cumulative)} 件</div>
        </div>
      </div>
    </div>
  );
}
