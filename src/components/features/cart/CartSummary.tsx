"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const total = getTotal();

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </p>
        <p className="text-xl font-bold text-foreground">
          Total: ${total.toFixed(2)}
        </p>
        <Link
          href="/products"
          className="inline-flex w-full items-center justify-center font-medium transition-colors px-4 py-2 rounded-md border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
        >
          Continue shopping
        </Link>
      </CardContent>
    </Card>
  );
}
