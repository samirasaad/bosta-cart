"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FunnelIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FilterChip } from "@/components/ui/FilterChip";
import { useCategories } from "@/hooks/useCategories";
import type { SortOrder } from "@/hooks/useProducts";

const iconClass = "w-4 h-4 shrink-0";

function buildHref(
  base: URLSearchParams,
  updates: Record<string, string>
): string {
  const params = new URLSearchParams(base.toString());
  Object.entries(updates).forEach(([key, value]) => {
    if (value) params.set(key, value);
    else params.delete(key);
  });
  params.set("page", "1");
  return `/products?${params.toString()}`;
}

function isFiltersActive(searchParams: URLSearchParams): boolean {
  return (
    (searchParams.get("category") ?? "") !== "" ||
    (searchParams.get("sort") ?? "asc") !== "asc"
  );
}

export function SortAndFilter() {
  const searchParams = useSearchParams();
  const { data: categories = [], isLoading } = useCategories();

  const sortOrder = (searchParams.get("sort") as SortOrder) ?? "asc";
  const category = searchParams.get("category") ?? "";

  return (
    <div className="rounded-xl border border-border bg-card mb-6 overflow-hidden shadow-md ring-1 ring-black/5">
      {/* Category row */}
      <div className="p-4 sm:p-5 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-2 mb-3">
          <FunnelIcon className={iconClass} aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Category
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            href={buildHref(searchParams, { category: "" })}
            isActive={!category}
            aria-label="All categories"
          >
            All
          </FilterChip>
          {!isLoading &&
            categories.map((c) => {
              const label = c.charAt(0).toUpperCase() + c.slice(1);
              return (
                <FilterChip
                  key={c}
                  href={buildHref(searchParams, { category: c })}
                  isActive={category === c}
                  aria-label={`Category: ${label}`}
                >
                  {label}
                </FilterChip>
              );
            })}
          {isLoading && (
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-9 w-20 rounded-full bg-muted animate-pulse"
                  aria-hidden
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sort row + Reset */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <ArrowsUpDownIcon className={iconClass} aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sort by price
            </span>
          </div>
          <Link
            href={buildHref(searchParams, {
              sort: sortOrder === "asc" ? "desc" : "asc",
            })}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 min-h-9 text-sm font-medium text-foreground hover:border-foreground/40 hover:bg-muted/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer"
            aria-label={
              sortOrder === "asc"
                ? "Sort price high to low (click to toggle)"
                : "Sort price low to high (click to toggle)"
            }
          >
            {sortOrder === "asc" ? (
              <>
                <ArrowUpIcon className={iconClass} aria-hidden />
                <span>Low → High</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className={iconClass} aria-hidden />
                <span>High → Low</span>
              </>
            )}
          </Link>
        </div>
        {isFiltersActive(searchParams) && (
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 min-h-9 text-sm font-medium text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer shrink-0"
            aria-label="Reset all filters"
          >
            <ArrowPathIcon className={iconClass} aria-hidden />
            Reset filters
          </Link>
        )}
      </div>
    </div>
  );
}
