import { ProductListSkeleton } from "@/components/features/product-list/ProductListSkeleton";

export default function ProductsLoading() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded bg-muted animate-pulse" />
        <div className="h-9 w-32 bg-muted rounded animate-pulse" />
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 mb-6 overflow-hidden">
        <div className="h-4 w-24 bg-muted rounded animate-pulse mb-3" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-20 rounded-full bg-muted animate-pulse" />
          ))}
        </div>
      </div>
      <ProductListSkeleton />
    </main>
  );
}
