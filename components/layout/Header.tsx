"use client";

import { useRef, useEffect, useState } from "react";
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
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { env } from "@/lib/env";

const iconClass = "w-5 h-5 shrink-0 ";

const navLinkClass = (active: boolean) =>
  `inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
    active ? "font-semibold text-foreground" : "text-muted-foreground"
  }`;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const itemCount = useCartStore((s) => s.getItemCount());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setUserMenuOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
    router.push("/products");
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 md:h-16 items-center justify-between gap-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:opacity-80"
        >
          <ShoppingBagIcon className={iconClass} aria-hidden />
          {env.siteName}
        </Link>

        {/* Burger button - mobile only */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" aria-hidden />
          ) : (
            <Bars3Icon className="w-6 h-6" aria-hidden />
          )}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 md:gap-4" aria-label="Main">
          <Link
            href="/products"
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
              pathname === "/products" ? "font-semibold text-foreground" : "text-muted-foreground"
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
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <PlusCircleIcon className={iconClass} aria-hidden />
                New Product
              </Link>
              <Link
                href="/cart"
                className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
                  pathname === "/cart" ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
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
              <div className="relative mt-2" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <UserCircleIcon className={iconClass} aria-hidden />
                  <span className="hidden sm:inline">{user?.username ?? "User"}</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 shrink-0 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 mt-2 min-w-48 rounded-lg border border-border bg-card py-1 shadow-lg"
                    role="menu"
                    aria-label="User menu"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border-b border-border">
                      <UserCircleIcon className={iconClass} aria-hidden />
                      <span className="font-medium text-foreground">{user?.username ?? "User"}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-left text-foreground hover:bg-muted rounded-b-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
                      role="menuitem"
                    >
                      <ArrowRightOnRectangleIcon className={`${iconClass} text-red-500`} aria-hidden />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
                  pathname === "/auth/login" ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                <ArrowLeftOnRectangleIcon className={iconClass} aria-hidden />
                Login
              </Link>
              <Link
                href="/auth/signup"
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
                  pathname === "/auth/signup" ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                <UserPlusIcon className={iconClass} aria-hidden />
                Sign up
              </Link>
              <Link
                href="/cart"
                className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 ${
                  pathname === "/cart" ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                <ShoppingCartIcon className={iconClass} aria-hidden />
                Cart
                {mounted && itemCount > 0 && (
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

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute left-0 right-0 top-full border-b border-border bg-background shadow-lg transition-[opacity,visibility] duration-200 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Main">
          <Link
            href="/products"
            onClick={closeMobile}
            className={`flex items-center gap-2 py-3 px-3 rounded-lg ${navLinkClass(pathname === "/products")}`}
          >
            <Squares2X2Icon className={iconClass} aria-hidden />
            Products
          </Link>
          {token ? (
            <>
              <Link
                href="/products/new"
                onClick={closeMobile}
                className={`flex items-center gap-2 py-3 px-3 rounded-lg ${navLinkClass(pathname === "/products/new")}`}
              >
                <PlusCircleIcon className={iconClass} aria-hidden />
                New Product
              </Link>
              <Link
                href="/cart"
                onClick={closeMobile}
                className={`relative flex items-center gap-2 py-3 px-3 rounded-lg ${navLinkClass(pathname === "/cart")}`}
              >
                <ShoppingCartIcon className={iconClass} aria-hidden />
                Cart
                {itemCount > 0 && (
                  <span
                    className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground text-background text-xs px-1.5"
                    aria-label={`${itemCount} items in cart`}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2 py-3 px-3 rounded-lg text-sm text-muted-foreground border-t border-border mt-2 pt-3">
                <UserCircleIcon className={iconClass} aria-hidden />
                <span className="font-medium text-foreground">{user?.username ?? "User"}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 py-3 px-3 rounded-lg text-sm text-left text-foreground hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
              >
                <ArrowRightOnRectangleIcon className={`${iconClass} text-red-500`} aria-hidden />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={closeMobile}
                className={`flex items-center gap-2 py-3 px-3 rounded-lg ${navLinkClass(pathname === "/auth/login")}`}
              >
                <ArrowLeftOnRectangleIcon className={iconClass} aria-hidden />
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={closeMobile}
                className={`flex items-center gap-2 py-3 px-3 rounded-lg ${navLinkClass(pathname === "/auth/signup")}`}
              >
                <UserPlusIcon className={iconClass} aria-hidden />
                Sign up
              </Link>
              <Link
                href="/cart"
                onClick={closeMobile}
                className={`relative flex items-center gap-2 py-3 px-3 rounded-lg ${navLinkClass(pathname === "/cart")}`}
              >
                <ShoppingCartIcon className={iconClass} aria-hidden />
                Cart
                {mounted && itemCount > 0 && (
                  <span
                    className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground text-background text-xs px-1.5"
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
