"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const placeholder = (
  <div className="flex justify-center items-center min-h-[40vh]">
    <p className="text-muted-foreground">Redirecting to login...</p>
  </div>
);

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    if (!token) {
      const redirect = encodeURIComponent(pathname ?? "/");
      router.replace(`/auth/login?redirect=${redirect}`);
    }
  }, [mounted, token, pathname, router]);

  if (!mounted) {
    return placeholder;
  }

  if (!token) {
    return placeholder;
  }

  return <>{children}</>;
}
