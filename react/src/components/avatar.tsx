import * as React from "react";
import { cn } from "../lib/cn";

/** Round avatar with initials fallback and an optional online dot. */
export function Avatar({
  name,
  src,
  size = 40,
  online,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  online?: boolean;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center rounded-full bg-soft font-display text-sm font-bold text-[color:var(--color-soft-foreground)]">
          {initials}
        </span>
      )}
      {online && (
        <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />
      )}
    </span>
  );
}
