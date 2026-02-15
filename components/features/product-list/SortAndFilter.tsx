"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FunnelIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
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
    (searchParams.get("q") ?? "") !== "" ||
    (searchParams.get("category") ?? "") !== "" ||
    (searchParams.get("sort") ?? "asc") !== "asc"
  );
}

function countActiveFilters(searchParams: URLSearchParams): number {
  let n = 0;
  if ((searchParams.get("q") ?? "").trim() !== "") n++;
  if ((searchParams.get("category") ?? "") !== "") n++;
  if ((searchParams.get("sort") ?? "asc") !== "asc") n++;
  return n;
}

export function SortAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories = [], isLoading } = useCategories();

  const sortOrder = (searchParams.get("sort") as SortOrder) ?? "asc";
  const category = searchParams.get("category") ?? "";
  const searchQuery = searchParams.get("q") ?? "";
  const activeCount = countActiveFilters(searchParams);
  const hasFilters = isFiltersActive(searchParams);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (new FormData(form).get("q") as string)?.trim() ?? "";
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    params.set("page", "1");
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("page", "1");
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-black/5 ring-1 ring-black/6 transition-shadow duration-200 hover:shadow-xl hover:shadow-black/5">
      {/* Search row */}
      <form
        onSubmit={handleSearchSubmit}
        className="p-4 sm:p-5 border-b border-border/50 bg-muted/30"
      >
        <label htmlFor="product-search" className="sr-only">
          Search by product name
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1 min-w-0 group">
            <MagnifyingGlassIcon
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none transition-colors duration-200 group-focus-within:text-foreground"
              aria-hidden
            />
            <input
              id="product-search"
              type="search"
              name="q"
              defaultValue={searchQuery}
              key={searchQuery}
              placeholder="Search by product name"
              className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:border-foreground/30 hover:border-foreground/20"
              aria-label="Search by product name"
            />
            {searchQuery.trim() !== "" && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                aria-label="Clear search and show all products"
              >
                <XMarkIcon className="w-5 h-5" aria-hidden />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer active:scale-[0.98]"
          >
            <MagnifyingGlassIcon className="w-4 h-4 shrink-0" aria-hidden />
            Search
          </button>
        </div>
      </form>

      {/* Category + Price filter row */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center gap-3 sm:gap-4 bg-muted/20">
        {/* Category */}
        <div className="flex items-center gap-2 shrink-0">
          <FunnelIcon className={`${iconClass} text-muted-foreground`} aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Category
          </span>
        </div>
        <div className="flex flex-wrap gap-2 min-w-0">
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

        {/* Price sort (same row) */}
        <div className="flex items-center gap-2 shrink-0 border-l border-border/60 pl-3 sm:pl-4 ml-1">
          <ArrowsUpDownIcon className={`${iconClass} text-muted-foreground`} aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Price
          </span>
          <Link
            href={buildHref(searchParams, {
              sort: sortOrder === "asc" ? "desc" : "asc",
            })}
            scroll={false}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 min-h-9 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/40 hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer active:scale-[0.98]"
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

        {/* Reset */}
        {hasFilters && (
          <Link
            href="/products"
            scroll={false}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 min-h-9 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-foreground/40 hover:text-foreground hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer shrink-0 active:scale-[0.98] ml-auto"
            aria-label="Reset all filters"
          >
            <ArrowPathIcon className={iconClass} aria-hidden />
            <span>Reset</span>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-muted text-xs font-semibold text-foreground">
                {activeCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
