"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api/products";
import type { Product } from "@/lib/types";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";

export function useProduct(
  id: string | number | null,
  initialProduct?: Product | null
) {
  const localProducts = useLocalProductsStore((s) => s.items);
  const numericId =
    id == null || id === ""
      ? null
      : typeof id === "string"
      ? Number(id)
      : id;

  const localProduct =
    numericId != null && !Number.isNaN(numericId)
      ? localProducts.find((p) => p.id === numericId)
      : undefined;

  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: id != null && id !== "" && !localProduct,
    initialData: localProduct ?? initialProduct ?? undefined,
    staleTime: localProduct ? Infinity : initialProduct ? 60_000 : 0,
    // Avoid client refetch overwriting server data with ECONNRESET from axios
    refetchOnMount: localProduct ? false : initialProduct ? false : true,
  });
}
