import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const iconClass = "w-5 h-5 shrink-0";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30 ">
      <div className="container mx-auto px-3 py-5 flex justify-between align-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity"
          >
            <ShoppingBagIcon className={iconClass} aria-hidden />
            Bosta Cart
          </Link>
          <nav className="flex items-center gap-6" aria-label="Footer">
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cart
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
        <p className=" text-center sm:text-left text-xs text-muted-foreground">
          E-commerce demo with Fake Store API. © {new Date().getFullYear()} Bosta Cart.
        </p>
      </div>
    </footer>
  );
}
