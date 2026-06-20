import * as React from "react";
import { cn } from "../lib/cn";

/** Pill toggle switch (controlled or uncontrolled). */
export function Switch({
  checked,
  defaultChecked,
  onChange,
  className,
  "aria-label": ariaLabel,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  "aria-label"?: string;
}) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isOn = checked ?? internal;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      onClick={() => {
        const next = !isOn;
        if (checked === undefined) setInternal(next);
        onChange?.(next);
      }}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        isOn ? "bg-primary" : "bg-border",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          isOn ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5 rtl:-translate-x-0.5",
        )}
      />
    </button>
  );
}
