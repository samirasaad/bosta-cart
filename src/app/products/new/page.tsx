import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { CreateProductForm } from "@/components/features/product-form/CreateProductForm";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";

export default function NewProductPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <ProtectedRoute>
        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          }
        >
          <CreateProductForm />
        </Suspense>
      </ProtectedRoute>
    </main>
  );
}
