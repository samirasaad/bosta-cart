import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const chevronClass = "w-5 h-5 shrink-0 text-muted-foreground pointer-events-none";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder, className = "", id, ...props },
    ref
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={[
              "w-full min-h-10 pl-3 pr-10 py-2 rounded-lg border bg-background text-foreground appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
              error ? "border-destructive" : "border-border hover:border-foreground/30",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {placeholder != null && (
              <option value="">{placeholder}</option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
            aria-hidden
          >
            <ChevronDownIcon className={chevronClass} />
          </span>
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
