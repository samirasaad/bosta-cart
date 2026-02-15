import { apiClient } from "./client";
import type { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>("/products");
  return data;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(
    `/products/category/${encodeURIComponent(category)}`
  );
  return data;
}

export async function getProduct(id: number | string): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>("/products/categories");
  return data;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<Product> {
  const { data } = await apiClient.post<Product>("/products", payload);
  return data;
}
