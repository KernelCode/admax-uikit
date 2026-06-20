import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/cn";

/** Minimal, tokenized table primitives. */
export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto scroll-slim">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  );
}

export function THead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("text-start", className)} {...props} />;
}

export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TR({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("border-b border-border last:border-0", className)} {...props} />;
}

export function TD({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-3 py-3 align-middle", className)} {...props} />;
}

/** A sortable header cell. `sort` = "asc" | "desc" | undefined. */
export function TH({
  children,
  sortable,
  sort,
  onSort,
  className,
}: {
  children?: React.ReactNode;
  sortable?: boolean;
  sort?: "asc" | "desc";
  onSort?: () => void;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-3 pb-3 text-start text-xs font-bold uppercase tracking-wide text-muted-foreground",
        className,
      )}
    >
      {sortable ? (
        <button onClick={onSort} className="inline-flex items-center gap-1 hover:text-foreground">
          {children}
          {sort === "asc" ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : sort === "desc" ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
          )}
        </button>
      ) : (
        children
      )}
    </th>
  );
}
