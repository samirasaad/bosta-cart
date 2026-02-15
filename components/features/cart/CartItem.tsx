"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/Button";
import type { CartItem as CartItemType } from "@/lib/types";

const iconClass = "w-4 h-4 shrink-0";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg bg-card">
      <div className="relative w-full sm:w-24 h-24 flex-shrink-0 bg-muted rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-1"
          sizes="96px"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          ${item.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="inline-flex items-center rounded-lg border border-border bg-background overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
            className="flex items-center justify-center w-10 h-10 text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-inset cursor-pointer"
          >
            <MinusIcon className={iconClass} aria-hidden />
          </button>
          <span
            className="min-w-10 px-2 py-2 text-center text-sm font-semibold tabular-nums border-x border-border bg-muted/30"
            aria-live="polite"
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            aria-label="Increase quantity"
            className="flex items-center justify-center w-10 h-10 text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-inset cursor-pointer"
          >
            <PlusIcon className={iconClass} aria-hidden />
          </button>
        </div>
        <p className="font-semibold text-foreground min-w-[4rem] text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.productId)}
          className="text-destructive hover:text-destructive inline-flex items-center gap-1.5"
          aria-label="Remove from cart"
        >
          <TrashIcon className={iconClass} aria-hidden />
          Remove
        </Button>
      </div>
    </div>
  );
}
