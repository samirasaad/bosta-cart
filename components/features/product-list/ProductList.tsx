"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard, type ProductCardProps } from "./ProductCard";
import { ProductListSkeleton } from "./ProductListSkeleton";
import { SortAndFilter } from "./SortAndFilter";
import { FeaturedProductsCarousel } from "./FeaturedProductsCarousel";
import { DealsSection } from "./DealsSection";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { useRecentProductStore } from "@/lib/stores/recentProductStore";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";
import { useMyProductActions } from "@/hooks/useMyProductActions";

export function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || null;
  const sortOrder = (searchParams.get("sort") as "asc" | "desc") ?? "asc";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const search = searchParams.get("q") || null;
  const filtersRef = useRef<HTMLDivElement>(null);
  const recentProduct = useRecentProductStore((s) => s.recentProduct);
  const localProducts = useLocalProductsStore((s) => s.items);
  const { deleteMyProduct } = useMyProductActions();

  useEffect(() => {
    const el = filtersRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [page, search]);

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    totalPages,
    currentPage,
    totalCount,
  } = useProducts({ category, sortOrder, page, search });

  if (isLoading) {
    return (
      <>
        <FeaturedProductsCarousel />
        <DealsSection />
        <div ref={filtersRef} className="scroll-mt-24 mb-6">
          <SortAndFilter />
        </div>
        <ProductListSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <FeaturedProductsCarousel />
        <DealsSection />
        <div ref={filtersRef} className="scroll-mt-24 mb-6">
          <SortAndFilter />
        </div>
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
        <div ref={filtersRef} className="scroll-mt-24 mb-6">
          <SortAndFilter />
        </div>
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            {search
              ? "No products match your search."
              : "No products found."}
          </p>
          <Link href="/products" className="mt-4 inline-block">
            <Button variant="outline" size="sm">
              {search ? "Clear search" : "Clear filters"}
            </Button>
          </Link>
        </div>
      </>
    );
  }

  const displayProducts =
    recentProduct && products && currentPage === 1
      ? (() => {
          const existsIndex = products.findIndex(
            (p) => p.id === recentProduct.id
          );
          // If the recent product is not in the current page results
          // (e.g. filtered out by search/category), don't inject it.
          if (existsIndex === -1) {
            return products;
          }
          if (existsIndex === 0) {
            return products;
          }
          const copy = [...products];
          const [item] = copy.splice(existsIndex, 1);
          return [item, ...copy];
        })()
      : products;

  return (
    <>
      <FeaturedProductsCarousel />
      <DealsSection />
      <div ref={filtersRef} className="scroll-mt-24 mb-6">
        <SortAndFilter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {displayProducts!.map((product) => {
          const isOwned = localProducts.some((p) => p.id === product.id);

          let overlayActions: ProductCardProps["overlayActions"];
          if (isOwned) {
            const handleEditClick = (
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/products/edit/${product.id}`);
            };

            const handleDeleteClick = async (
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              e.preventDefault();
              e.stopPropagation();
              await deleteMyProduct.mutateAsync(product);
            };

            overlayActions = (
              <>
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-border text-muted-foreground hover:text-foreground hover:bg-background hover:border-foreground/40 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                  aria-label={`Edit ${product.title}`}
                >
                  <PencilSquareIcon className="w-4 h-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-red-500 text-red-600 hover:bg-red-50 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  aria-label={`Delete ${product.title}`}
                  title={`Delete "${product.title}"`}
                >
                  <TrashIcon className="w-4 h-4" aria-hidden />
                </button>
              </>
            );
          }

          const cardProps: ProductCardProps = {
            product,
            isNew: recentProduct != null && product.id === recentProduct.id,
            overlayActions,
          };
          return <ProductCard key={product.id} {...cardProps} />;
        })}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            getPageHref={(p) =>
              `/products?${new URLSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: String(p),
              }).toString()}`
            }
            ariaLabel="Products pagination"
          />
        </div>
      )}
    </>
  );
}
