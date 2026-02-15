import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiError } from "@/lib/types";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string } | string>) => {
    const data = error.response?.data;
    const message =
      (typeof data === "string" ? data : (data as { message?: string } | undefined)?.message) ??
      error.message ??
      "An unexpected error occurred";
    const apiError: ApiError = {
      message,
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);
