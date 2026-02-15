import { ProductDetailSkeleton } from "@/components/features/product-detail/ProductDetailSkeleton";

export default function ProductDetailLoading() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <ProductDetailSkeleton />
    </main>
  );
}