"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/Button";

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
          className="text-lg font-semibold text-foreground hover:opacity-80"
        >
          Bosta Cart
        </Link>
        <nav className="flex items-center gap-2 md:gap-4" aria-label="Main">
          <Link
            href="/products"
            className={`text-sm font-medium transition-colors hover:opacity-80 ${
              pathname === "/products" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Products
          </Link>
          {token ? (
            <>
              <Link
                href="/products/new"
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                  pathname === "/products/new"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                New Product
              </Link>
              <Link
                href="/cart"
                className="relative text-sm font-medium transition-colors hover:opacity-80 text-muted-foreground"
              >
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
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.username ?? "User"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:opacity-80"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-muted-foreground hover:opacity-80"
              >
                Sign up
              </Link>
              <Link
                href="/cart"
                className="relative text-sm font-medium transition-colors hover:opacity-80 text-muted-foreground"
              >
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
