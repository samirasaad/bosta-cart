"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/products";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";

export function useCategories() {
  const localProducts = useLocalProductsStore((s) => s.items);

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const localCategories = Array.from(
    new Set(localProducts.map((p) => p.category))
  );

  const merged =
    query.data != null
      ? Array.from(new Set([...query.data, ...localCategories])).sort()
      : localCategories.sort();

  return {
    ...query,
    data: merged,
  };
}
