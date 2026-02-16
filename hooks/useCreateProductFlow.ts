import { useCallback } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import type { CreateProductFormValues } from "@/lib/schemas/product";
import type { Product } from "@/lib/types";
import { useRecentProductStore } from "@/lib/stores/recentProductStore";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";

interface UseCreateProductFlowResult {
  createFromForm: (values: CreateProductFormValues) => Promise<Product | null>;
  isPending: boolean;
  error: unknown;
  isSuccess: boolean;
}

/**
 * Encapsulates the full "create product" flow:
 * - call API
 * - generate synthetic local id
 * - persist in local stores
 * - keep the form component focused on UI concerns only.
 *
 * Logic is kept identical to the existing implementation in `CreateProductForm`.
 */
export function useCreateProductFlow(): UseCreateProductFlowResult {
  const createProduct = useCreateProduct();
  const setRecentProduct = useRecentProductStore((s) => s.setRecentProduct);
  const addLocalProduct = useLocalProductsStore((s) => s.addProduct);

  const createFromForm = useCallback(
    async (values: CreateProductFormValues): Promise<Product | null> => {
      try {
        const upperTitle = values.title.toUpperCase();
        const upperDescription = values.description.toUpperCase();

        const createdFromApi = await createProduct.mutateAsync({
          title: upperTitle,
          description: upperDescription,
          // `price` is a number here thanks to the schema transform.
          price: Number(values.price),
          category: values.category,
          image: values.image,
        });

        const syntheticId = Date.now();
        const localProduct: Product = {
          ...createdFromApi,
          id: syntheticId,
          apiId: createdFromApi.id,
          title: upperTitle,
          description: upperDescription,
        };

        setRecentProduct(localProduct);
        addLocalProduct(localProduct);

        return localProduct;
      } catch {
        // Let callers rely on `error` / `isPending` from the mutation.
        return null;
      }
    },
    [addLocalProduct, createProduct, setRecentProduct]
  );

  return {
    createFromForm,
    isPending: createProduct.isPending,
    error: createProduct.error,
    isSuccess: createProduct.isSuccess,
  };
}

