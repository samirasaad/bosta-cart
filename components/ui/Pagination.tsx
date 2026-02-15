"use client";

import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export interface PaginationProps {
  /** Current 1-based page */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items (optional, for "X items" display) */
  totalCount?: number;
  /** Build href for a given 1-based page */
  getPageHref: (page: number) => string;
  /** Base path for aria-label (e.g. "Products") */
  ariaLabel?: string;
  /** Max page numbers to show before using ellipsis (default 7) */
  maxVisiblePages?: number;
}

const iconClass = "w-5 h-5 shrink-0";

const baseButtonClass =
  "inline-flex items-center justify-center min-w-[2.5rem] h-10 rounded-lg border border-border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer";

const activeClass = `${baseButtonClass} bg-foreground text-background border-foreground hover:opacity-90`;
const inactiveClass = `${baseButtonClass} bg-background text-foreground border-border hover:bg-muted`;
const disabledClass =
  "inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground opacity-50 pointer-events-none cursor-default";

/**
 * Returns an array of page numbers to show, with -1 representing an ellipsis.
 * When there are many pages, shows first, last, and a window around current (e.g. 1 ... 4 5 6 ... 10).
 */
function getPageNumbers(currentPage: number, totalPages: number, maxVisible: number): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const windowSize = Math.max(1, maxVisible - 2); // reserve slots for first and last when separate
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }
  const pages: number[] = [];
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push(-1);
  }
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push(-1);
    pages.push(totalPages);
  }
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  getPageHref,
  ariaLabel = "Pagination",
  maxVisiblePages = 7,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  return (
    <nav
      className="flex flex-col items-center gap-4"
      aria-label={ariaLabel}
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link
            href={getPageHref(currentPage - 1)}
            scroll={false}
            className={inactiveClass}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className={iconClass} aria-hidden />
          </Link>
        ) : (
          <span
            className={disabledClass}
            aria-disabled="true"
            aria-label="Previous page (no previous page)"
          >
            <ChevronLeftIcon className={iconClass} aria-hidden />
          </span>
        )}

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, i) =>
            p === -1 ? (
              <span
                key={`ellipsis-${i}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground"
                aria-hidden
              >
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </span>
            ) : (
              <Link
                key={p}
                href={getPageHref(p)}
                scroll={false}
                className={p === currentPage ? activeClass : inactiveClass}
                aria-label={p === currentPage ? `Page ${p}, current` : `Page ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </Link>
            )
          )}
        </div>

        {/* Next */}
        {currentPage < totalPages ? (
          <Link
            href={getPageHref(currentPage + 1)}
            scroll={false}
            className={inactiveClass}
            aria-label="Next page"
          >
            <ChevronRightIcon className={iconClass} aria-hidden />
          </Link>
        ) : (
          <span
            className={disabledClass}
            aria-disabled="true"
            aria-label="Next page (no next page)"
          >
            <ChevronRightIcon className={iconClass} aria-hidden />
          </span>
        )}
      </div>

      {/* Summary */}
      <p className="text-sm text-muted-foreground text-center">
        Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
        {totalCount != null && totalCount >= 0 && (
          <> · <span className="font-medium text-foreground">{totalCount.toLocaleString()}</span> items</>
        )}
      </p>
    </nav>
  );
}
