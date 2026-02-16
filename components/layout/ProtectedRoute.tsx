"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { Spinner } from "@/components/ui/Spinner";
import { WishlistSkeleton } from "@/components/features/wishlist/WishlistSkeleton";
import { MyProductsSkeleton } from "@/components/features/my-products/MyProductsSkeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const loadingPlaceholder = (
  <div className="flex justify-center items-center min-h-[40vh]">
    <Spinner size="lg" />
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
    if (pathname?.startsWith("/wishlist")) {
      return <WishlistSkeleton />;
    }
    if (pathname?.startsWith("/my-products")) {
      return <MyProductsSkeleton />;
    }
    return loadingPlaceholder;
  }

  if (!token) {
    return loadingPlaceholder;
  }

  return <>{children}</>;
}
