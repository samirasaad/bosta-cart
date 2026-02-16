import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

const LOCAL_PRODUCTS_STORAGE_KEY = "bosta-local-products";

interface LocalProductsState {
  items: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  removeProduct: (id: number) => void;
  clear: () => void;
}

export const useLocalProductsStore = create<LocalProductsState>()(
  persist(
    (set) => ({
      items: [],
      addProduct: (product) =>
        set((state) => {
          const exists = state.items.some((p) => p.id === product.id);
          if (exists) {
            return {
              items: state.items.map((p) =>
                p.id === product.id ? { ...p, ...product } : p
              ),
            };
          }
          return { items: [product, ...state.items] };
        }),
      updateProduct: (id, updates) =>
        set((state) => ({
          items: state.items.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      removeProduct: (id) =>
        set((state) => ({
          items: state.items.filter((p) => p.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: LOCAL_PRODUCTS_STORAGE_KEY,
    }
  )
);

