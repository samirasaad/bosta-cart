import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export function WishlistSkeleton() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 inline-flex items-center gap-2">
        <HeartIconSolid
          className="w-8 h-8 shrink-0 text-red-500"
          aria-hidden
        />
        <span className="h-6 w-32 bg-muted rounded animate-pulse" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col h-full border border-border rounded-lg bg-card overflow-hidden"
          >
            <div className="relative aspect-square bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              <div className="flex gap-2 mt-4">
                <div className="h-9 flex-1 bg-muted rounded-lg animate-pulse" />
                <div className="h-9 w-9 bg-muted rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

