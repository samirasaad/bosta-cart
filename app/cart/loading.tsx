import { Spinner } from "@/components/ui/Spinner";

export default function CartLoading() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-1 items-center justify-center min-h-[40vh]" role="status" aria-label="Loading cart">
        <Spinner size="lg" className="text-muted-foreground" />
      </div>
    </main>
  );
}
