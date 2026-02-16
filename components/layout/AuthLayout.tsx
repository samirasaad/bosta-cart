import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { env } from "@/lib/env";
import { LottiePlayer } from "@/components/ui/lotties/LottiePlayer";
import ShoppingCartAnimation from "@/public/lotties/shopping-cart.json";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const CART_PATTERN_SVG = '<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><g fill="none" stroke="#e2e8f0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"><path d="M24 28L19 38v24a3 3 0 003 3h28a3 3 0 003-3V38L53 28H24z"/><path d="M19 38h34"/><path d="M34 28V22a4 4 0 118 0v6"/><circle cx="28" cy="70" r="4" fill="#e2e8f0" stroke="none" opacity="0.9"/><circle cx="60" cy="70" r="4" fill="#e2e8f0" stroke="none" opacity="0.9"/></g></svg>';

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main
      className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden"
      role="main"
      aria-label="Authentication"
    >
      {/* Left: branding panel — uses site foreground/primary color family */}
      <div className="relative w-full md:w-1/2 md:flex-1 min-h-[200px] md:min-h-0 flex flex-col justify-center items-center px-6 py-10 md:py-12 overflow-hidden border-b md:border-b-0 md:border-r border-border bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-950 bg-size-[200%_200%] animate-[gradient-shift_12s_ease-in-out_infinite]">
        {/* Vignette + text-safe overlay */}
        <div className="absolute inset-0 pointer-events-none z-1" aria-hidden>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        {/* Layer 1: subtle dot grid — muted-foreground tone */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            color: "var(--color-muted-foreground)",
          }}
        />
        {/* Layer 2: shopping cart pattern — light on dark, matches system */}
        {/* lottie animation */}
        <LottiePlayer animationData={ShoppingCartAnimation} className="w-60 mx-auto" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.22]"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(CART_PATTERN_SVG)}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "96px 96px",
          }}
        />
        {/* Floating orbs — neutral, system-aligned */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-muted-foreground/20 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 rounded-full bg-muted-foreground/15 blur-2xl animate-[float_10s_ease-in-out_infinite] [animation-delay:1.5s]" />
          <div className="absolute top-1/2 right-1/3 w-28 h-28 rounded-full bg-muted-foreground/10 blur-xl animate-[float_7s_ease-in-out_infinite] [animation-delay:3s]" />
        </div>
        {/* Content — light text on dark panel (matches primary-button ink: neutral-900) */}
        <div className="relative z-10 text-center space-y-8 max-w-sm">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-base font-bold text-neutral-300 hover:text-white rounded-lg px-3 py-2 -m-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 animate-[fade-in-up_0.5s_ease-out_both] [animation-fill-mode:both] [animation-delay:0.1s]"
            aria-label={`Back to ${env.siteName}`}
          >
            <ShoppingBagIcon className="w-6 h-6 shrink-0" aria-hidden />
            {env.siteName}
          </Link>
          <div className="space-y-3 animate-[fade-in-up_0.6s_ease-out_both] [animation-fill-mode:both] [animation-delay:0.2s]">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center tracking-tight drop-shadow-md">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-neutral-200/95 text-center leading-relaxed max-w-sm mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Right: form panel — card entrance animation */}
      <div className="w-full md:w-1/2 md:flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-8 md:py-10 bg-muted/30 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="w-full max-w-md animate-[fade-in-up_0.5s_ease-out_both] [animation-fill-mode:both] [animation-delay:0.15s]">
          <div
            className="rounded-2xl border border-border bg-card shadow-lg p-6 sm:p-8 transition-all duration-300 focus-within:ring-2 focus-within:ring-foreground/20 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:shadow-xl"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
