"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-foreground">Failed to load products</h1>
      <p className="mt-2 text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <Link href="/products">
          <Button variant="outline" className="inline-flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" aria-hidden />
            Back to products
          </Button>
        </Link>
      </div>
    </div>
  );
}
