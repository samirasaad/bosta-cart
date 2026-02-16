"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Squares2X2Icon, ArrowRightIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";
import { ProductCard } from "@/components/features/product-list/ProductCard";
import { useMyProductActions } from "@/hooks/useMyProductActions";

const iconClass = "w-5 h-5 shrink-0";

export function MyProductsPageContent() {
  const router = useRouter();
  const items = useLocalProductsStore((s) => s.items);
  const { deleteMyProduct } = useMyProductActions();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center min-h-[192px] rounded-lg bg-muted/30 overflow-hidden">
          <Squares2X2Icon className="w-16 h-16 text-muted-foreground" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold mb-4">You haven&apos;t added any products yet</h1>
        <p className="text-muted-foreground mb-6">
          Create a new product from the products page to see it listed here.
        </p>
        <Link
          href="/products/new"
          className="group inline-flex items-center justify-center gap-2 font-medium px-6 py-3 text-lg rounded-lg bg-foreground text-background hover:opacity-90 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowRightIcon
            className={`${iconClass} transition-transform duration-300 group-hover:translate-x-1`}
            aria-hidden
          />
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 inline-flex items-center gap-2">
        <Squares2X2Icon className="w-8 h-8 shrink-0" aria-hidden />
        My products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((product) => {
          const handleDelete = async () => {
            await deleteMyProduct.mutateAsync(product);
          };

          const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/products/edit/${product.id}`);
          };

          const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete();
          };

          const overlayActions = (
            <>
              <button
                type="button"
                onClick={handleEditClick}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-border text-muted-foreground hover:text-foreground hover:bg-background hover:border-foreground/40 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                aria-label={`Edit ${product.title}`}
              >
                <PencilSquareIcon className="w-4 h-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 border border-red-500 text-red-600 hover:bg-red-50 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                aria-label={`Delete ${product.title}`}
                title={`Delete "${product.title}"`}
              >
                <TrashIcon className="w-4 h-4" aria-hidden />
              </button>
            </>
          );

          return (
            <div key={product.id} className="h-full flex flex-col gap-3">
              <ProductCard product={product} overlayActions={overlayActions} />
            </div>
          );
        })}
      </div>
    </>
  );
}

