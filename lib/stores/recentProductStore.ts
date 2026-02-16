import { create } from "zustand";
import type { Product } from "@/lib/types";

interface RecentProductState {
  recentProduct: Product | null;
  setRecentProduct: (product: Product) => void;
  clearRecentProduct: () => void;
}

export const useRecentProductStore = create<RecentProductState>()((set) => ({
  recentProduct: null,
  setRecentProduct: (product) => set({ recentProduct: product }),
  clearRecentProduct: () => set({ recentProduct: null }),
}));

