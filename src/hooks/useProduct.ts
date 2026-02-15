"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api/products";

export function useProduct(id: string | number | null) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: id != null && id !== "",
  });
}
