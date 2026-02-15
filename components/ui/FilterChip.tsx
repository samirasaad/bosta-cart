"use client";

import Link from "next/link";

export interface FilterChipProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  /** Optional aria-label for accessibility */
  "aria-label"?: string;
  className?: string;
}

const baseClass =
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer whitespace-nowrap";

const activeClass =
  "bg-foreground text-background shadow-sm hover:opacity-90";

const inactiveClass =
  "border border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-muted/50";

/**
 * Pill-style filter chip for category/sort selection. Use with Link for shareable URLs.
 */
export function FilterChip({
  href,
  isActive,
  children,
  "aria-label": ariaLabel,
  className = "",
}: FilterChipProps) {
  return (
    <Link
      href={href}
      className={`${baseClass} px-4 py-2.5 min-h-9 ${isActive ? activeClass : inactiveClass} ${className}`}
      aria-current={isActive ? "true" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
