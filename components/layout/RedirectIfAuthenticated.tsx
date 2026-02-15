"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Renders children only when the user is not authenticated.
 * If authenticated (token exists), redirects to the products list (or redirectTo).
 */
export function RedirectIfAuthenticated({
  children,
  redirectTo = "/products",
}: RedirectIfAuthenticatedProps) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      router.replace(redirectTo);
    }
  }, [token, router, redirectTo]);

  if (token) {
    return null;
  }

  return <>{children}</>;
}
