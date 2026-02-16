import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SelectableChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  isActive: boolean;
  children: ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer whitespace-nowrap active:scale-[0.98]";

const activeClass =
  "bg-foreground text-background shadow-sm hover:opacity-90 hover:shadow-md";

const inactiveClass =
  "border border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-muted/50";

export function SelectableChip({
  isActive,
  children,
  className = "",
  ...props
}: SelectableChipProps) {
  return (
    <button
      type="button"
      className={`${baseClass} px-4 py-2.5 min-h-9 ${
        isActive ? activeClass : inactiveClass
      } ${className}`}
      aria-pressed={isActive}
      {...props}
    >
      {children}
    </button>
  );
}

