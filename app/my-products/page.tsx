import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { MyProductsPageContent } from "@/components/features/my-products/MyProductsPageContent";

export default function MyProductsPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <ProtectedRoute>
        <MyProductsPageContent />
      </ProtectedRoute>
    </main>
  );
}

