import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

const MAX_STARS = 5;

interface StarRatingProps {
  rate: number;
  count: number;
  className?: string;
  size?: "sm" | "md";
}

export function StarRating({ rate, count, className = "", size = "md" }: StarRatingProps) {
  const clamped = Math.min(MAX_STARS, Math.max(0, rate));
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`Rating: ${clamped.toFixed(1)} out of ${MAX_STARS} (${count} reviews)`}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => {
        const filled = i < Math.round(clamped);
        const Star = filled ? StarSolid : StarOutline;
        return (
          <Star
            key={i}
            className={`${sizeClass} shrink-0 ${filled ? "text-amber-500" : "text-muted-foreground/60"}`}
            aria-hidden
          />
        );
      })}
      <span className="text-sm text-muted-foreground ml-1">
        {clamped.toFixed(1)} · {count}
      </span>
    </div>
  );
}
