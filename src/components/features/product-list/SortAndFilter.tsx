"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";
import { useCategories } from "@/hooks/useCategories";
import type { SortOrder } from "@/hooks/useProducts";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
];

export function SortAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories = [], isLoading } = useCategories();

  const sortOrder = (searchParams.get("sort") as SortOrder) ?? "asc";
  const category = searchParams.get("category") ?? "";

  const categoryOptions = categories.map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  }));

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 min-w-0">
        <Select
          label="Category"
          options={categoryOptions}
          value={category}
          placeholder="All categories"
          disabled={isLoading}
          onChange={(e) =>
            updateParams({ category: e.target.value || "" })
          }
        />
      </div>
      <div className="flex-1 min-w-0">
        <Select
          label="Sort by price"
          options={SORT_OPTIONS}
          value={sortOrder}
          onChange={(e) =>
            updateParams({ sort: e.target.value as SortOrder })
          }
        />
      </div>
    </div>
  );
}
