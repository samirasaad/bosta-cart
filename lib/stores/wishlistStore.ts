import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItem } from "@/lib/types";
import type { Product } from "@/lib/types";

const WISHLIST_STORAGE_KEY = "bosta-wishlist";

function getStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  getCount: () => number;
}

function toWishlistItem(product: Product): WishlistItem {
  return {
    productId: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
  };
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item.productId === product.id)) {
            return state;
          }
          return {
            items: [...state.items, toWishlistItem(product)],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      toggleItem: (product) => {
        const inList = get().items.some((item) => item.productId === product.id);
        if (inList) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
      getCount: () => get().items.length,
    }),
    {
      name: WISHLIST_STORAGE_KEY,
      storage: {
        getItem: (name) => {
          const str = getStorage().getItem(name);
          if (str == null) return null;
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          getStorage().setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => getStorage().removeItem(name),
      },
      partialize: (state) =>
        ({ items: state.items }) as WishlistState,
    }
  )
);
