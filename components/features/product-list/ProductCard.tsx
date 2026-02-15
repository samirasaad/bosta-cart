"use client";

import Image from "next/image";
import Link from "next/link";
import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/stores/cartStore";
import type { Product } from "@/lib/types";

const iconClass = "w-4 h-4 shrink-0";
const iconAnim = "transition-transform duration-200 ease-out group-hover:scale-125 group-active:scale-95";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card className=" flex flex-col h-full">
      <Link
        href={`/products/${product.id}`}
        className="block aspect-square relative bg-muted"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />
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
