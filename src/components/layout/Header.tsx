"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBagIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/Button";

const iconClass = "w-5 h-5 shrink-0";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const itemCount = useCartStore((s) => s.getItemCount());

  const handleLogout = () => {
    logout();
    router.push("/products");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 md:h-16 items-center justify-between gap-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:opacity-80"
        >
          <ShoppingBagIcon className={iconClass} aria-hidden />
          Bosta Cart
        </Link>
        <nav className="flex items-center gap-2 md:gap-4" aria-label="Main">
          <Link
            href="/products"
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
              pathname === "/products" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Squares2X2Icon className={iconClass} aria-hidden />
            Products
          </Link>
          {token ? (
            <>
              <Link
                href="/products/new"
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
                  pathname === "/products/new"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <PlusCircleIcon className={iconClass} aria-hidden />
                New Product
              </Link>
              <Link
                href="/cart"
                className="relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 text-muted-foreground"
              >
                <ShoppingCartIcon className={iconClass} aria-hidden />
                Cart
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground text-background text-xs px-1"
                    aria-label={`${itemCount} items in cart`}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <UserCircleIcon className={iconClass} aria-hidden />
                {user?.username ?? "User"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground inline-flex items-center gap-1.5"
              >
                <ArrowRightOnRectangleIcon className={iconClass} aria-hidden />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:opacity-80"
              >
                <ArrowLeftOnRectangleIcon className={iconClass} aria-hidden />
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:opacity-80"
              >
                <UserPlusIcon className={iconClass} aria-hidden />
                Sign up
              </Link>
              <Link
                href="/cart"
                className="relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 text-muted-foreground"
              >
                <ShoppingCartIcon className={iconClass} aria-hidden />
                Cart
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground text-background text-xs px-1"
                    aria-label={`${itemCount} items in cart`}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
