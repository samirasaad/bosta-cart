import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { WishlistPageContent } from "@/components/features/wishlist/WishlistPageContent";

export default function WishlistPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <ProtectedRoute>
        <WishlistPageContent />
      </ProtectedRoute>
    </main>
  );
}
