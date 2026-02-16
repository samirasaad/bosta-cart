"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ArrowLeftIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/Button";
import type { WishlistItem as WishlistItemType } from "@/lib/types";
import type { Product } from "@/lib/types";
import { Heart } from "@/components/ui/lotties/HeartAnimation";

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
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

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
          return (
            <div
              key={item.productId}
              className="flex flex-col h-full border border-border rounded-lg bg-card overflow-hidden"
            >
              <Link
                href={`/products/${item.productId}`}
                className="relative block aspect-square bg-muted shrink-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
              </Link>
              <div className="p-4 flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-medium text-foreground line-clamp-2 hover:underline block"
                  >
                    {item.title}
                  </Link>
                  <p className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 mt-4 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => addItem(product)}
                    className="inline-flex items-center gap-1.5 flex-1 min-w-0"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    <ShoppingCartIcon className="w-4 h-4 shrink-0" aria-hidden />
                    Add to cart
                  </Button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="inline-flex items-center justify-center h-9 w-9 shrink-0 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                    aria-label={`Remove ${item.title} from wishlist`}
                  >
                    <TrashIcon className="w-4 h-4 shrink-0" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
