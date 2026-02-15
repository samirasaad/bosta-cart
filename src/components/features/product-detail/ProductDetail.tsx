"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const iconClass = "w-5 h-5 shrink-0";

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
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
    <Card className="overflow-hidden max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col">
          <CardHeader className="p-0">
            <p className="text-sm text-muted-foreground capitalize mb-1">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <p className="text-lg font-semibold text-foreground mt-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-muted-foreground mt-4 flex-1">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 font-medium transition-colors px-6 py-3 text-lg rounded-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                <ArrowLeftIcon className={iconClass} aria-hidden />
                Back to Products
              </Link>
              <Button
                variant="primary"
                size="lg"
                onClick={() => addItem(product)}
                className="inline-flex items-center gap-2"
              >
                <ShoppingCartIcon className={iconClass} aria-hidden />
                Add to cart
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
