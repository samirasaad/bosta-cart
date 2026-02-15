import { ProductDetail } from "@/components/features/product-detail/ProductDetail";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        }
      >
        <ProductDetail productId={id} />
      </Suspense>
    </main>
  );
}
