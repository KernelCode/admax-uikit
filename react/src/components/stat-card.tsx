import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "./card";
import { Sparkline } from "./charts";
import { cn } from "../lib/cn";

/** KPI tile: big value + label + inline sparkline + optional delta chip. */
export function StatCard({
  label,
  value,
  data,
  color = "var(--color-brand-500)",
  delta,
  icon,
  className,
}: {
  label: string;
  value: string;
  data?: number[];
  color?: string;
  delta?: number;
  icon?: React.ReactNode;
  className?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-display text-2xl font-extrabold tracking-tight tabular-nums">{value}</div>
          <div className="mt-0.5 truncate text-sm text-muted-foreground">{label}</div>
        </div>
        {icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-soft text-[color:var(--color-soft-foreground)]">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-bold",
              up ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
        {data && <Sparkline data={data} color={color} className="h-9 max-w-[120px]" />}
      </div>
    </Card>
  );
}
