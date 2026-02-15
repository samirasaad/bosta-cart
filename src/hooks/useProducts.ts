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
}

function sortByPrice(products: Product[], order: SortOrder): Product[] {
  return [...products].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );
}

export function useProducts({ category, sortOrder, page }: UseProductsParams) {
  const query = useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: () =>
      category ? getProductsByCategory(category) : getProducts(),
  });

  const sorted =
    query.data != null ? sortByPrice(query.data, sortOrder) : undefined;
  const totalCount = sorted?.length ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sorted?.slice(start, start + ITEMS_PER_PAGE);

  return {
    ...query,
    data: paginatedProducts,
    allData: sorted,
    totalCount,
    totalPages,
    currentPage,
  };
}
