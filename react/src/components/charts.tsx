import * as React from "react";
import { cn } from "../lib/cn";

/* ------------------------------------------------------------------ *
 * Tiny dependency-free SVG charts. Everything is drawn into a fixed
 * viewBox and scaled with `preserveAspectRatio`, so they stay crisp
 * and responsive without a charting library.
 * ------------------------------------------------------------------ */

function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0]![0]} ${points[0]![1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(0, i - 1)]!;
    const [x1, y1] = points[i]!;
    const [x2, y2] = points[i + 1]!;
    const [x3, y3] = points[Math.min(points.length - 1, i + 2)]!;
    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
  }
  return d.join(" ");
}

function scale(values: number[], w: number, h: number, pad = 2): [number, number][] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  return values.map((v, i) => [pad + i * step, h - pad - ((v - min) / span) * (h - pad * 2)]);
}

/** Inline sparkline (line + soft area), used in KPI cards & campaign rows. */
export function Sparkline({
  data,
  color = "var(--color-brand-500)",
  area = true,
  strokeWidth = 2.5,
  className,
}: {
  data: number[];
  color?: string;
  area?: boolean;
  strokeWidth?: number;
  className?: string;
}) {
  const w = 100;
  const h = 32;
  const pts = scale(data, w, h, 3);
  const line = smoothPath(pts);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("h-9 w-full", className)}>
      {area && <path d={`${line} L ${w - 3} ${h} L 3 ${h} Z`} fill={color} fillOpacity={0.12} />}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export interface Series {
  label: string;
  data: number[];
  color: string;
}

/** Multi-series smooth line chart with a faint grid and x-axis labels. */
export function LineChart({
  series,
  labels,
  height = 220,
  className,
}: {
  series: Series[];
  labels?: string[];
  height?: number;
  className?: string;
}) {
  const w = 520;
  const h = 200;
  const all = series.flatMap((s) => s.data);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const span = max - min || 1;
  const n = Math.max(...series.map((s) => s.data.length));
  const toPts = (data: number[]): [number, number][] =>
    data.map((v, i) => [
      8 + (i * (w - 16)) / (n - 1 || 1),
      h - 16 - ((v - min) / span) * (h - 28),
    ]);
  const rows = 4;
  return (
    <div className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
        {Array.from({ length: rows + 1 }).map((_, i) => {
          const y = 8 + (i * (h - 24)) / rows;
          return <line key={i} x1="8" y1={y} x2={w - 8} y2={y} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 6" />;
        })}
        {series.map((s) => {
          const pts = toPts(s.data);
          return (
            <g key={s.label}>
              <path d={`${smoothPath(pts)} L ${pts[pts.length - 1]![0]} ${h - 16} L ${pts[0]![0]} ${h - 16} Z`} fill={s.color} fillOpacity={0.08} />
              <path d={smoothPath(pts)} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" />
              {pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="var(--color-card)" stroke={s.color} strokeWidth="2" />
              ))}
            </g>
          );
        })}
      </svg>
      {labels && (
        <div className="mt-2 flex justify-between px-1 text-[11px] font-medium text-muted-foreground">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Candlestick-ish bar chart (green up / red down), like the engagement panels. */
export function BarsChart({
  data,
  height = 180,
  className,
}: {
  data: { value: number; up: boolean }[];
  height?: number;
  className?: string;
}) {
  const w = 320;
  const h = 140;
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const bw = (w - 8) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} style={{ height }} preserveAspectRatio="none">
      {data.map((d, i) => {
        const bh = (d.value / max) * (h - 12);
        const x = 4 + i * bw + bw * 0.22;
        return (
          <rect
            key={i}
            x={x}
            y={h - bh}
            width={bw * 0.56}
            height={bh}
            rx={bw * 0.28}
            fill={d.up ? "var(--color-success)" : "var(--color-danger)"}
            opacity={0.92}
          />
        );
      })}
    </svg>
  );
}

/** Donut chart with a centered glyph, like the "Target Statistics" panel. */
export function Donut({
  segments,
  size = 150,
  thickness = 22,
  children,
  className,
}: {
  segments: { value: number; color: string; label?: string }[];
  size?: number;
  thickness?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-muted)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
