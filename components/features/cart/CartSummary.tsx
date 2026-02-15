"use client";

import { useState } from "react";
import { ArrowLeftIcon, TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/lib/stores/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const iconClass = "w-5 h-5 shrink-0";

const PROMO_CODES: Record<string, number> = {
  SAVE10: 0.1,
};

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const subtotal = getTotal();

  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const discountRate = appliedCode ? PROMO_CODES[appliedCode] ?? 0 : 0;
  const discount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discount);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    setPromoError(null);
    if (!code) {
      setPromoError("Enter a promo code");
      return;
    }
    if (PROMO_CODES[code] != null) {
      setAppliedCode(code);
      setPromoInput("");
    } else {
      setPromoError("Invalid or expired code");
    }
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setPromoError(null);
    setPromoInput("");
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </p>

        {/* Coupon / Promo code */}
        <div className="space-y-2">
          <label htmlFor="promo-code" className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <TagIcon className="w-4 h-4 shrink-0" aria-hidden />
            Coupon / Promo code
          </label>
          {appliedCode ? (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-sm font-medium text-foreground">{appliedCode}</span>
              <button
                type="button"
                onClick={handleRemovePromo}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                aria-label="Remove promo code"
              >
                <XMarkIcon className="w-5 h-5" aria-hidden />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                id="promo-code"
                type="text"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                placeholder="e.g. SAVE10"
                className="flex-1 min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                aria-invalid={!!promoError}
                aria-describedby={promoError ? "promo-error" : undefined}
              />
              <Button type="button" variant="outline" size="md" onClick={handleApplyPromo}>
                Apply
              </Button>
            </div>
          )}
          {promoError && (
            <p id="promo-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
              {promoError}
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="space-y-1 border-t border-border pt-4">
          {discount > 0 && (
            <>
              <p className="text-muted-foreground text-sm flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm flex justify-between">
                <span>Discount ({appliedCode})</span>
                <span>-${discount.toFixed(2)}</span>
              </p>
            </>
          )}
          <p className="text-xl font-bold text-foreground flex justify-between items-baseline">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </p>
        </div>

        <Link
          href="/products"
          className="group inline-flex w-full items-center justify-center gap-2 font-medium px-4 py-2.5 rounded-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeftIcon
            className={`${iconClass} transition-transform duration-300 group-hover:-translate-x-1`}
            aria-hidden
          />
          Continue shopping
        </Link>
      </CardContent>
    </Card>
  );
}
