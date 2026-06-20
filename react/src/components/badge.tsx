import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

const badge = cva("inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-semibold leading-none", {
  variants: {
    variant: {
      neutral: "bg-muted text-muted-foreground",
      brand: "bg-soft text-[color:var(--color-soft-foreground)]",
      success: "bg-success/15 text-success",
      danger: "bg-danger/15 text-danger",
      accent: "bg-accent/15 text-accent",
      slate: "bg-foreground/10 text-foreground/70",
      outline: "border border-border text-muted-foreground",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant }), className)} {...props} />;
}

/** A small status pill with a leading dot (Running / Paused / Expired). */
export function StatusPill({
  status,
  children,
  className,
}: {
  status: "running" | "paused" | "expired";
  children: React.ReactNode;
  className?: string;
}) {
  const map = {
    running: { variant: "success" as const, dot: "bg-success" },
    paused: { variant: "danger" as const, dot: "bg-danger" },
    expired: { variant: "slate" as const, dot: "bg-foreground/40" },
  };
  const s = map[status];
  return (
    <Badge variant={s.variant} className={cn("px-3 py-1.5", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {children}
    </Badge>
  );
}
