"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  type CreateProductPayload,
} from "@/lib/api/products";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
