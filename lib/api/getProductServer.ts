/**
 * Server-only product fetch using native fetch + retry.
 * Use this for generateMetadata and page SSR to avoid Node→API ECONNRESET from axios.
 */

import { API_BASE_URL } from "@/lib/constants";
import type { Product } from "@/lib/types";

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 1200;
const REQUEST_TIMEOUT_MS = 15000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProductServer(id: number | string): Promise<Product> {
  const url = `${API_BASE_URL.replace(/\/$/, "")}/products/${id}`;
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        const err = new Error(res.status === 404 ? "Not Found" : `HTTP ${res.status}`) as Error & { status?: number };
        err.status = res.status;
        throw err;
      }
      const data = (await res.json()) as Product;
      return data;
    } catch (e) {
      clearTimeout(timeoutId);
      lastError = e;
      if (e && typeof e === "object" && "status" in e && (e as { status: number }).status === 404) throw e;
      if (attempt < MAX_ATTEMPTS) await delay(RETRY_DELAY_MS);
    }
  }
  throw lastError;
}
