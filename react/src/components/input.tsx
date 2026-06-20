import * as React from "react";
import { cn } from "../lib/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-[var(--radius-md)] border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

/** Search input with a leading icon, matching the topbar search field. */
export const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <div className="relative w-full">
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-[var(--radius-md)] border border-border bg-card ps-3 pe-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
    <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      {icon}
    </span>
  </div>
));
SearchInput.displayName = "SearchInput";
