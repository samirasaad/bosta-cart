export interface Product {
  /** Synthetic id used by the app (may differ from API id). */
  id: number;
  /** Original id returned by the Fake Store API, when applicable. */
  apiId?: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

export type Category = string;

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  productId: number;
  title: string;
  image: string;
  price: number;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
