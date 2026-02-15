"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { Button } from "@/components/ui/Button";

export function CartPageContent() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add products from the Products or Product Details page.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center font-medium transition-colors px-6 py-3 text-lg rounded-lg bg-foreground text-background hover:opacity-90"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </>
  );
}
