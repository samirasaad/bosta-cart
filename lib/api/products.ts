import { apiClient } from "./client";
import type { Product } from "@/lib/types";

export type ProductsSortOrder = "asc" | "desc";

export interface GetProductsParams {
  limit?: number;
  sort?: ProductsSortOrder;
}

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>("/products", {
    params: params ? { limit: params.limit, sort: params.sort } : undefined,
  });
  return data;
}

export interface GetProductsByCategoryParams {
  sort?: ProductsSortOrder;
}

export async function getProductsByCategory(
  category: string,
  params?: GetProductsByCategoryParams
): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(
    `/products/category/${encodeURIComponent(category)}`,
    { params: params ? { sort: params.sort } : undefined }
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

export type UpdateProductPayload = Partial<CreateProductPayload>;

export async function updateProduct(
  id: number | string,
  payload: UpdateProductPayload
): Promise<Product> {
  const { data } = await apiClient.put<Product>(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: number | string): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}

