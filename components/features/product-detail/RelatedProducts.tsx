"use client";

import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getProductsByCategory } from "@/lib/api/products";
import { ProductCard } from "@/components/features/product-list/ProductCard";
import { ProductCardSkeleton } from "@/components/features/product-list/ProductCardSkeleton";
import type { Product } from "@/lib/types";

const iconClass = "w-5 h-5 shrink-0";
const MAX_ITEMS = 6;
const CARD_MIN_WIDTH = 240;
const SCROLL_THRESHOLD = 2;

const btnClass =
  "inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2";
const btnDisabledClass =
  "opacity-50 pointer-events-none cursor-default text-muted-foreground";

interface RelatedProductsProps {
  /** Current product (excluded from list) */
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const { data: categoryProducts = [], isLoading } = useQuery({
    queryKey: ["products", "category", currentProduct.category],
    queryFn: () => getProductsByCategory(currentProduct.category),
  });

  const related = categoryProducts
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, MAX_ITEMS);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanGoPrev(scrollLeft > SCROLL_THRESHOLD);
    setCanGoNext(scrollLeft + clientWidth < scrollWidth - SCROLL_THRESHOLD);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const tick = () => requestAnimationFrame(updateScrollState);
    tick();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(tick);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [related.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    if (direction === "left" && !canGoPrev) return;
    if (direction === "right" && !canGoNext) return;
    const step = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="mt-10" aria-label="Similar products">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Similar products
        </h2>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ minWidth: CARD_MIN_WIDTH, maxWidth: CARD_MIN_WIDTH }}
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-10" aria-label="Similar products">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Similar products
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canGoPrev}
            className={`${btnClass} ${canGoPrev ? "hover:bg-muted cursor-pointer" : btnDisabledClass}`}
            aria-label={canGoPrev ? "Previous" : "Previous (at start)"}
          >
            <ChevronLeftIcon className={iconClass} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canGoNext}
            className={`${btnClass} ${canGoNext ? "hover:bg-muted cursor-pointer" : btnDisabledClass}`}
            aria-label={canGoNext ? "Next" : "Next (at end)"}
          >
            <ChevronRightIcon className={iconClass} aria-hidden />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {related.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0"
            style={{ minWidth: CARD_MIN_WIDTH, maxWidth: CARD_MIN_WIDTH }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
