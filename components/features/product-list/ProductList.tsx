"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductListSkeleton } from "./ProductListSkeleton";
import { SortAndFilter } from "./SortAndFilter";
import { FeaturedProductsCarousel } from "./FeaturedProductsCarousel";
import { DealsSection } from "./DealsSection";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";

export function ProductList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || null;
  const sortOrder = (searchParams.get("sort") as "asc" | "desc") ?? "asc";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    totalPages,
    currentPage,
    totalCount,
  } = useProducts({ category, sortOrder, page });

  if (isLoading) {
    return (
      <>
        <FeaturedProductsCarousel />
        <DealsSection />
        <SortAndFilter />
        <ProductListSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <FeaturedProductsCarousel />
        <DealsSection />
        <SortAndFilter />
        <ErrorMessage
          message={
            typeof error === "object" && error && "message" in error
              ? String((error as { message: string }).message)
              : "Failed to load products."
          }
          onRetry={() => refetch()}
        />
      </>
    );
  }

  if (!products?.length) {
    return (
      <>
        <FeaturedProductsCarousel />
        <DealsSection />
        <SortAndFilter />
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">No products found.</p>
          <Link href="/products" className="mt-4 inline-block">
            <Button variant="outline" size="sm">
              Clear filters
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <FeaturedProductsCarousel />
      <DealsSection />
      <SortAndFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            getPageHref={(page) =>
              `/products?${new URLSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: String(page),
              }).toString()}`
            }
            ariaLabel="Products pagination"
          />
        </div>
      )}
    </>
  );
}
