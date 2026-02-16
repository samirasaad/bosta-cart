import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-foreground",
  secondary:
    "bg-muted text-foreground hover:bg-muted/80 focus:ring-2 focus:ring-offset-2 focus:ring-muted",
  outline:
    "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus:ring-2 focus:ring-offset-2 focus:ring-foreground",
  ghost:
    "text-foreground hover:bg-muted focus:ring-2 focus:ring-offset-2 focus:ring-muted",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded",
  md: "px-4 py-2 text-base rounded-md",
  lg: "px-6 py-3 rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled ?? isLoading}
      className={[
        "inline-flex items-center justify-center font-medium rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        // Subtle micro-interactions shared across variants
        "transition-all duration-150 ease-out active:scale-[0.97]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
