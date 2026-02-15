"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsByCategory } from "@/lib/api/products";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type { Product } from "@/lib/types";

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
  const query = useQuery({
    queryKey: ["products", category ?? "all", sortOrder],
    queryFn: () =>
      category
        ? getProductsByCategory(category, { sort: sortOrder })
        : getProducts({ sort: sortOrder }),
  });

  const sorted =
    query.data != null ? sortByPrice(query.data, sortOrder) : undefined;
  const filtered =
    sorted != null && search?.trim()
      ? filterBySearch(sorted, search)
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
