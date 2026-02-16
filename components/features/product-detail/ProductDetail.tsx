"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ShoppingCartIcon, HeartIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useProduct } from "@/hooks/useProduct";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";
import { isApiError } from "@/lib/api/errors";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useMyProductActions } from "@/hooks/useMyProductActions";
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
  const localProducts = useLocalProductsStore((s) => s.items);
  const [imgError, setImgError] = useState(false);
  const numericId = Number(productId);
  const localProduct =
    !Number.isNaN(numericId)
      ? localProducts.find((p) => p.id === numericId)
      : undefined;

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(productId, initialProduct ?? localProduct ?? undefined);
  const token = useAuthStore((s) => s.token);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(Number(productId)));
  const { deleteMyProduct } = useMyProductActions();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  };

  const effectiveProduct = product ?? localProduct ?? initialProduct ?? null;
  const isOwned = !!localProduct;

  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/236bc653-0054-4a73-9c0a-28effcb1fbbd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "components/features/product-detail/ProductDetail.tsx:effectiveProduct",
      message: "ProductDetail render state",
      data: {
        productId,
        hasLocalProduct: !!localProduct,
        hasInitialProduct: !!initialProduct,
        hasQueryProduct: !!product,
        isOwned,
      },
      timestamp: Date.now(),
      runId: "initial",
      hypothesisId: "H1",
    }),
  }).catch(() => {});
  // #endregion agent log

  if (isLoading && !effectiveProduct) {
    return <ProductDetailSkeleton />;
  }

  if (!effectiveProduct) {
    const apiError = isApiError(error || null) ? (error as any) : null;
    const canRetry = isError && apiError ? apiError.status !== 404 : isError && !apiError;
    return (
      <ErrorMessage
        message={
          isError && error && typeof error === "object" && "message" in error
            ? String((error as { message: string }).message)
            : "Product not found."
        }
        onRetry={canRetry ? () => refetch() : undefined}
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
              src={imgError ? "/icon.svg" : effectiveProduct.image}
              alt={effectiveProduct.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
              onError={() => setImgError(true)}
            />
          </div>
          <div className="flex flex-col">
            <CardHeader className="p-0">
              <p className="text-sm text-muted-foreground capitalize mb-1">
                {effectiveProduct.category}
              </p>
              <div className="flex items-start gap-3">
                <h1 className="text-2xl md:text-3xl font-bold min-w-0 flex-1">
                  {effectiveProduct.title}
                </h1>
                {isOwned && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/products/edit/${effectiveProduct.id}`)
                      }
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-border text-muted-foreground hover:text-foreground hover:bg-background hover:border-foreground/40 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                      aria-label={`Edit ${effectiveProduct.title}`}
                      title={`Edit \"${effectiveProduct.title}\"`}
                    >
                      <PencilSquareIcon className={iconClass} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteMyProduct.mutateAsync(effectiveProduct);
                        router.push("/my-products");
                      }}
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-red-500 text-red-600 hover:bg-red-50 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      aria-label={`Delete ${effectiveProduct.title}`}
                      title={`Delete \"${effectiveProduct.title}\"`}
                    >
                      <TrashIcon className={iconClass} aria-hidden />
                    </button>
                  </div>
                )}
              </div>
              {effectiveProduct.rating != null && (
                <StarRating
                  rate={effectiveProduct.rating.rate}
                  count={effectiveProduct.rating.count}
                  className="mt-2"
                />
              )}
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <p className=" font-semibold text-foreground mt-2">
                ${effectiveProduct.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground mt-4 break-all">
                {effectiveProduct.description}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addItem(effectiveProduct)}
                  className="group inline-flex items-center justify-center gap-2"
                  aria-label={`Add ${effectiveProduct.title} to cart`}
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
                    onClick={() => toggleWishlist(effectiveProduct)}
                    className="group inline-flex items-center justify-center gap-2 cursor-pointer"
                    aria-label={
                      isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
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
      <RelatedProducts currentProduct={effectiveProduct} />
    </div>
  );
}
