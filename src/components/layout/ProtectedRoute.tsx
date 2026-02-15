"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!token) {
      const redirect = encodeURIComponent(pathname ?? "/");
      router.replace(`/login?redirect=${redirect}`);
    }
  }, [token, pathname, router]);

  if (typeof window !== "undefined" && !token) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}
