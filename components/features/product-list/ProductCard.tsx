"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import type { Product } from "@/lib/types";

const iconClass = "w-4 h-4 shrink-0";
const iconAnim = "transition-transform duration-200 ease-out group-hover:scale-125 group-active:scale-95";

export interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  /** Optional overlay rendered in the top-right over the product image (e.g. edit/delete icons). */
  overlayActions?: React.ReactNode;
}

export function ProductCard({ product, isNew = false, overlayActions }: ProductCardProps) {
  const token = useAuthStore((s) => s.token);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg ${
        isNew ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background" : ""
      }`}
    >
      {isNew && (
        <span className="absolute -top-2 left-2 z-1 rounded-full bg-emerald-500 text-xs font-semibold text-background px-3 py-1 shadow-sm">
          New
        </span>
      )}
      <Link
        href={`/products/${product.id}`}
        className="block aspect-square relative bg-muted"
      >
        <Image
          src={imgError ? "/icon.svg" : product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
          onError={() => setImgError(true)}
        />
        {overlayActions && (
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            {overlayActions}
          </div>
        )}
      </Link>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 text-base font-medium min-w-0">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground capitalize">
          {product.category}
        </p>
        {product.description && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        {product.rating != null && (
          <StarRating
            rate={product.rating.rate}
            count={product.rating.count}
            size="sm"
            className="mt-1"
          />
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="border-t border-border bg-muted/30 flex items-center justify-center gap-3  rounded-b-lg">
        <Link
          href={`/products/${product.id}`}
          className="group inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-background hover:border-foreground/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          aria-label={`View details for ${product.title}`}
        >
          <EyeIcon className={`${iconClass} ${iconAnim}`} aria-hidden />
        </Link>
        {token && (
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="group inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-background hover:border-foreground/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            aria-label={isInWishlist ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          >
            {isInWishlist ? (
              <HeartIconSolid className={`${iconClass} ${iconAnim} text-red-500`} aria-hidden />
            ) : (
              <HeartIcon className={`${iconClass} ${iconAnim}`} aria-hidden />
            )}
          </button>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={() => addItem(product)}
          className="group inline-flex items-center justify-center h-11 w-11 rounded-full p-0 shadow-sm hover:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingCartIcon className={`${iconClass} ${iconAnim}`} aria-hidden />
        </Button>
      </CardFooter>
    </Card>
  );
}
