import Link from "next/link";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { ProductList } from "@/components/features/product-list/ProductList";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <section className="mb-6 md:mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold inline-flex items-center gap-2">
            <Squares2X2Icon className="w-8 h-8 shrink-0" aria-hidden />
            Products
          </h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
            Discover featured deals, browse all categories, and manage your own
            products in a fast, responsive shopping experience.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link href="/products/new">
            <Button size="sm">
              Add product
            </Button>
          </Link>
        </div>
      </section>
      <ProductList />
    </main>
  );
}
