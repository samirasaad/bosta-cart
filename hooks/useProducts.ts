"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsByCategory } from "@/lib/api/products";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";

export type SortOrder = "asc" | "desc";

export interface UseProductsParams {
  category: string | null;
  sortOrder: SortOrder;
  page: number;
  search?: string | null;
}

/** Client-side sort by price (API sort may be by id); ensures consistent UX. */
function sortByPrice(products: Product[], order: SortOrder): Product[] {
  return [...products].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );
}

/** Client-side filter by product title (case-insensitive, partial match). */
function filterBySearch(products: Product[], search: string): Product[] {
  const term = search.trim().toLowerCase();
  if (!term) return products;
  return products.filter((p) => p.title.toLowerCase().includes(term));
}

export function useProducts({ category, sortOrder, page, search }: UseProductsParams) {
  const localProducts = useLocalProductsStore((s) => s.items);

  const query = useQuery({
    queryKey: ["products", category ?? "all", sortOrder],
    queryFn: () =>
      category
        ? getProductsByCategory(category, { sort: sortOrder })
        : getProducts({ sort: sortOrder }),
  });

  const mergedBase: Product[] | undefined = query.data
    ? (() => {
        const base = query.data;
        const localFiltered = category
          ? localProducts.filter((p) => p.category === category)
          : localProducts;
        const byId = new Map<number, Product>();
        for (const p of base) byId.set(p.id, p);
        for (const p of localFiltered) byId.set(p.id, p);
        return Array.from(byId.values());
      })()
    : undefined;

  const sorted =
    mergedBase != null ? sortByPrice(mergedBase, sortOrder) : undefined;
  const searchTerm = search != null ? String(search).trim() : "";
  const filtered =
    sorted != null && searchTerm !== ""
      ? filterBySearch(sorted, searchTerm)
      : sorted ?? undefined;
  const totalCount = filtered?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered?.slice(start, start + ITEMS_PER_PAGE);

  return {
    ...query,
    data: paginatedProducts,
    allData: sorted,
    totalCount,
    totalPages,
    currentPage,
  };
}
