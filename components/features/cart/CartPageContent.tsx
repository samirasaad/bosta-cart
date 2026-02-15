"use client";

import Link from "next/link";
import { ShoppingCartIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/lib/stores/cartStore";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "@/components/ui/EmptyCart";

const iconClass = "w-6 h-6 shrink-0";

export function CartPageContent() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center min-h-[192px] rounded-lg bg-muted/30 overflow-hidden">
          {/* <ShoppingCartIcon
            className="w-28 h-28 text-muted-foreground animate-pulse"
            aria-hidden
          /> */}
          <EmptyCart />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
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
        <ShoppingCartIcon className="w-8 h-8 shrink-0" aria-hidden />
        Cart
      </h1>
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
