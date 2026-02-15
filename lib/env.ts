/**
 * Central env config. Use these instead of process.env directly.
 * NEXT_PUBLIC_* vars are available on server and client.
 */

function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    "http://localhost:3000"
  );
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com";
}

function getSiteName(): string {
  return process.env.NEXT_PUBLIC_SITE_NAME ?? "Bosta Cart";
}

/** Optional default OG image URL for fallback metadata (e.g. when product API fails). */
function getOgImageDefault(): string | null {
  const v = process.env.NEXT_PUBLIC_OG_IMAGE_DEFAULT;
  return v && v.startsWith("http") ? v : null;
}

export const env = {
  get appUrl() {
    return getAppUrl();
  },
  get apiBaseUrl() {
    return getApiBaseUrl();
  },
  get siteName() {
    return getSiteName();
  },
  get ogImageDefault() {
    return getOgImageDefault();
  },
};
