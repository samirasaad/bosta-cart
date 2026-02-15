import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { ProductList } from "@/components/features/product-list/ProductList";
import { Suspense } from "react";
import { ProductListSkeleton } from "@/components/features/product-list/ProductListSkeleton";

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 inline-flex items-center gap-2">
        <Squares2X2Icon className="w-8 h-8 shrink-0" aria-hidden />
        Products
      </h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </main>
  );
}
