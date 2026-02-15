"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api/products";
import type { Product } from "@/lib/types";

export function useProduct(id: string | number | null, initialProduct?: Product | null) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: id != null && id !== "",
    initialData: initialProduct ?? undefined,
    staleTime: initialProduct ? 60_000 : 0,
    // Avoid client refetch overwriting server data with ECONNRESET from axios
    refetchOnMount: initialProduct ? false : true,
  });
}
