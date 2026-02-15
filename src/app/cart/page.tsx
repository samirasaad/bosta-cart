import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { CartPageContent } from "@/components/features/cart/CartPageContent";

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <ProtectedRoute>
        <CartPageContent />
      </ProtectedRoute>
    </main>
  );
}
