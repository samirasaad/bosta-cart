"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useProduct } from "@/hooks/useProduct";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
import { StarRating } from "@/components/ui/StarRating";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { RelatedProducts } from "./RelatedProducts";
import type { Product } from "@/lib/types";

const iconClass = "w-5 h-5 shrink-0";

interface ProductDetailProps {
  productId: string;
  initialProduct?: Product | null;
}

export function ProductDetail({ productId, initialProduct }: ProductDetailProps) {
  const router = useRouter();
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId, initialProduct);
  const token = useAuthStore((s) => s.token);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(Number(productId)));

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <ErrorMessage
        message={
          isError && error && typeof error === "object" && "message" in error
            ? String((error as { message: string }).message)
            : "Product not found."
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <button
        type="button"
        onClick={handleBack}
        className="cursor-pointer mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:rounded"
        aria-label="Back to previous page"
      >
        <ArrowLeftIcon className="w-5 h-5 shrink-0" aria-hidden />
        Back
      </button>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
          />
          </div>
          <div className="flex flex-col">
            <CardHeader className="p-0">
              <p className="text-sm text-muted-foreground capitalize mb-1">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold min-w-0">{product.title}</h1>
              {product.rating != null && (
                <StarRating
                  rate={product.rating.rate}
                  count={product.rating.count}
                  className="mt-2"
                />
              )}
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <p className="text-lg font-semibold text-foreground mt-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground mt-4 flex-1">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addItem(product)}
                  className="group inline-flex items-center justify-center gap-2"
                  aria-label={`Add ${product.title} to cart`}
                >
                  <ShoppingCartIcon
                    className={`${iconClass} transition-transform duration-200 ease-out group-hover:scale-125 group-active:scale-95`}
                    aria-hidden
                  />
                  Add to cart
                </Button>
                {token && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => toggleWishlist(product)}
                    className="group inline-flex items-center justify-center gap-2"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {isInWishlist ? (
                      <HeartIconSolid className={`${iconClass} text-red-500 transition-transform duration-200 ease-out group-hover:scale-125 group-active:scale-95`} aria-hidden />
                    ) : (
                      <HeartIcon className={`${iconClass} transition-transform duration-200 ease-out group-hover:scale-125 group-active:scale-95`} aria-hidden />
                    )}
                    {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      <RelatedProducts currentProduct={product} />
    </div>
  );
}
