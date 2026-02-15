"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/lib/stores/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

const iconClass = "w-5 h-5 shrink-0";

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
          className="inline-flex w-full items-center justify-center gap-2 font-medium transition-colors px-4 py-2 rounded-md border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
        >
          <ArrowLeftIcon className={iconClass} aria-hidden />
          Continue shopping
        </Link>
      </CardContent>
    </Card>
  );
}
