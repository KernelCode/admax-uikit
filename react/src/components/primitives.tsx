import { Check, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/cn";

/* ---------------- Checkbox ---------------- */
export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
}: {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const on = checked ?? internal;
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium">
      <button
        type="button"
        role="checkbox"
        aria-checked={on}
        onClick={() => {
          if (checked === undefined) setInternal(!on);
          onChange?.(!on);
        }}
        className={cn(
          "grid h-5 w-5 place-items-center rounded-[var(--radius-sm)] border transition-colors",
          on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
        )}
      >
        {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </button>
      {label}
    </label>
  );
}

/* ---------------- Radio ---------------- */
export function RadioGroup({
  options,
  value,
  defaultValue,
  onChange,
}: {
  options: { label: string; value: string }[];
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value);
  const sel = value ?? internal;
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((o) => {
        const on = sel === o.value;
        return (
          <label key={o.value} className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium">
            <button
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => {
                if (value === undefined) setInternal(o.value);
                onChange?.(o.value);
              }}
              className={cn(
                "grid h-5 w-5 place-items-center rounded-full border transition-colors",
                on ? "border-primary" : "border-border",
              )}
            >
              {on && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
            </button>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

/* ---------------- Select ---------------- */
export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative inline-block w-full">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-full border border-border bg-card ps-4 pe-10 text-sm font-medium text-foreground outline-none focus:border-primary",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

/* ---------------- Textarea ---------------- */
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[96px] w-full rounded-[var(--radius)] border border-border bg-card p-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

/* ---------------- Progress ---------------- */
export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

/* ---------------- Skeleton ---------------- */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[var(--radius-md)] bg-muted", className)} />;
}

/* ---------------- Tooltip ---------------- */
export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute -top-9 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-sm)] bg-ink px-2.5 py-1 text-xs font-medium text-ink-foreground opacity-0 transition-opacity group-hover:opacity-100 rtl:translate-x-1/2">
        {label}
      </span>
    </span>
  );
}

/* ---------------- Tabs ---------------- */
export function Tabs({
  tabs,
  defaultTab,
}: {
  tabs: { id: string; label: string; content?: React.ReactNode }[];
  defaultTab?: string;
}) {
  const [active, setActive] = React.useState(defaultTab ?? tabs[0]?.id);
  return (
    <div>
      <div className="inline-flex gap-1 rounded-full bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
              active === t.id ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}

/* ---------------- Pagination ---------------- */
export function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage?: (p: number) => void;
}) {
  const go = (p: number) => onPage?.(Math.min(total, Math.max(1, p)));
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => go(page - 1)}
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground disabled:opacity-40"
        disabled={page <= 1}
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
      </button>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => go(i + 1)}
          className={cn(
            "h-9 w-9 rounded-full text-sm font-bold",
            page === i + 1 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => go(page + 1)}
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground disabled:opacity-40"
        disabled={page >= total}
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4 rtl:rotate-180" />
      </button>
    </div>
  );
}
