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
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/stores/cartStore";
import type { Product } from "@/lib/types";

const iconClass = "w-4 h-4 shrink-0";

interface ProductCardProps {
  product: Product;
}

const linkButtonClass =
  "inline-flex items-center justify-center font-medium transition-colors px-4 py-2 text-base rounded-md border-2 border-foreground text-foreground hover:bg-foreground hover:text-background flex-1 text-center";

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card className="overflow-hidden flex flex-col h-full">
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
        />
      </Link>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 text-base font-medium">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground capitalize">
          {product.category}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0">
        <Link
          href={`/products/${product.id}`}
          className={`${linkButtonClass} inline-flex items-center justify-center gap-2`}
        >
          <EyeIcon className={iconClass} aria-hidden />
          View Details
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addItem(product)}
          className="flex-1 inline-flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className={iconClass} aria-hidden />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
