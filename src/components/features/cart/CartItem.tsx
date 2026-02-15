"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/Button";
import type { CartItem as CartItemType } from "@/lib/types";

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
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          ${item.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </Button>
          <span className="w-8 text-center font-medium" aria-live="polite">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
        <p className="font-semibold text-foreground min-w-[4rem] text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.productId)}
          className="text-destructive hover:text-destructive"
          aria-label="Remove from cart"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
