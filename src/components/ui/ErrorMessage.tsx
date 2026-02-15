import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { HTMLAttributes } from "react";

interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  className = "",
  ...props
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive ${className}`}
      {...props}
    >
      <p className="font-semibold inline-flex items-center gap-2">
        <ExclamationTriangleIcon className="w-5 h-5 shrink-0" aria-hidden />
        {title}
      </p>
      <p className="mt-1 text-sm opacity-90">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded"
        >
          Try again
        </button>
      )}
    </div>
  );
}
