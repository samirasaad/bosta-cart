"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct, deleteProduct, type UpdateProductPayload } from "@/lib/api/products";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import type { Product } from "@/lib/types";

interface UpdateArgs {
  product: Product;
  updates: UpdateProductPayload;
}

export function useMyProductActions() {
  const queryClient = useQueryClient();
  const updateLocal = useLocalProductsStore((s) => s.updateProduct);
  const removeLocal = useLocalProductsStore((s) => s.removeProduct);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);

  const updateMutation = useMutation({
    mutationFn: async ({ product, updates }: UpdateArgs) => {
      const apiId = product.apiId ?? product.id;
      const updatedFromApi = await updateProduct(apiId, updates);

      // Preserve the local synthetic id while merging fresh data from the API.
      // This keeps "my products" entries addressable by their local id.
      const merged: Product = {
        ...product,
        ...updatedFromApi,
        ...updates,
        id: product.id,
        apiId: product.apiId ?? updatedFromApi.id ?? product.id,
      };

      updateLocal(product.id, merged);
      return merged;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (product: Product) => {
      const apiId = product.apiId ?? product.id;
      await deleteProduct(apiId);

      // Remove from local "my products" and wishlist so deleted items disappear everywhere.
      removeLocal(product.id);
      removeFromWishlist(product.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    updateMyProduct: updateMutation,
    deleteMyProduct: deleteMutation,
  };
}


