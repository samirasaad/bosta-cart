"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartIcon, ArrowLeftIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import type { WishlistItem as WishlistItemType } from "@/lib/types";
import type { Product } from "@/lib/types";
import { Heart } from "@/components/ui/lotties/HeartAnimation";
import { ProductCard } from "@/components/features/product-list/ProductCard";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";
import { useMyProductActions } from "@/hooks/useMyProductActions";

const iconClass = "w-5 h-5 shrink-0";

function wishlistItemToProduct(item: WishlistItemType): Product {
  return {
    id: item.productId,
    title: item.title,
    image: item.image,
    price: item.price,
    description: "",
    category: "",
  };
}

export function WishlistPageContent() {
  const router = useRouter();
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const localProducts = useLocalProductsStore((s) => s.items);
  const { deleteMyProduct } = useMyProductActions();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center min-h-[192px] rounded-lg bg-muted/30 overflow-hidden">
        <Heart />        </div>
        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add products from the Products or Product Details page.
        </p>
        <Link
          href="/products"
          className="group inline-flex items-center justify-center gap-2 font-medium px-6 py-3 text-lg rounded-lg bg-foreground text-background hover:opacity-90 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeftIcon
            className={`${iconClass} transition-transform duration-300 group-hover:-translate-x-1`}
            aria-hidden
          />
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 inline-flex items-center gap-2">
        <HeartIconSolid className="w-8 h-8 shrink-0 text-red-500" aria-hidden />
        My wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => {
          const product = wishlistItemToProduct(item);
          const isOwned = localProducts.some((p) => p.id === product.id);

          let overlayActions;
          if (isOwned) {
            const handleEditClick = (
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/products/edit/${product.id}`);
            };

            const handleDeleteClick = async (
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              e.preventDefault();
              e.stopPropagation();
              await deleteMyProduct.mutateAsync(
                localProducts.find((p) => p.id === product.id)!
              );
              removeItem(item.productId);
            };

            overlayActions = (
              <>
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-border text-muted-foreground hover:text-foreground hover:bg-background hover:border-foreground/40 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                  aria-label={`Edit ${product.title}`}
                >
                  <PencilSquareIcon className="w-4 h-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-red-500 text-red-600 hover:bg-red-50 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  aria-label={`Delete ${product.title}`}
                  title={`Delete "${product.title}"`}
                >
                  <TrashIcon className="w-4 h-4" aria-hidden />
                </button>
              </>
            );
          }

          return (
            <div key={item.productId} className="h-full">
              <ProductCard product={product} overlayActions={overlayActions} />
            </div>
          );
        })}
      </div>
    </>
  );
}
