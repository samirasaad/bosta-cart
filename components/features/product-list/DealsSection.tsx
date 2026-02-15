"use client";

import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon, TagIcon } from "@heroicons/react/24/outline";
import { getProducts } from "@/lib/api/products";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

const iconClass = "w-5 h-5 shrink-0";
const DEALS_COUNT = 8;
const CARD_MIN_WIDTH = 260;
const SCROLL_THRESHOLD = 2;

const btnClass =
  "inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2";
const btnDisabledClass =
  "opacity-50 pointer-events-none cursor-default text-muted-foreground";

export function DealsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "deals", DEALS_COUNT],
    queryFn: () => getProducts({ limit: DEALS_COUNT, sort: "desc" }),
  });

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
  }, [products?.length]);

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
      <section className="mb-8" aria-label="Deals">
        <div className="flex items-center gap-2 mb-4">
          <TagIcon className={iconClass} aria-hidden />
          <h2 className="text-lg font-semibold text-foreground">Deals</h2>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
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

  if (!products.length) return null;

  return (
    <section className="mb-8" aria-label="Deals">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <TagIcon className={iconClass} aria-hidden />
          <h2 className="text-lg font-semibold text-foreground">Deals</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canGoPrev}
            className={`${btnClass} ${canGoPrev ? "hover:bg-muted cursor-pointer" : btnDisabledClass}`}
            aria-label={canGoPrev ? "Previous deals" : "Previous (at start)"}
          >
            <ChevronLeftIcon className={iconClass} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canGoNext}
            className={`${btnClass} ${canGoNext ? "hover:bg-muted cursor-pointer" : btnDisabledClass}`}
            aria-label={canGoNext ? "Next deals" : "Next (at end)"}
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
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 relative"
            style={{ minWidth: CARD_MIN_WIDTH, maxWidth: CARD_MIN_WIDTH }}
          >
            <span
              className="absolute top-2 right-2 z-10 rounded-full bg-foreground px-2 py-0.5 text-xs font-semibold text-background shadow-sm"
              aria-hidden
            >
              Deal
            </span>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
