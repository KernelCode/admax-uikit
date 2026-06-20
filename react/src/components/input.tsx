import * as React from "react";
import { cn } from "../lib/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-full border border-transparent bg-muted px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card",
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
        "h-11 w-full rounded-full border border-transparent bg-muted ps-4 pe-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card",
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
