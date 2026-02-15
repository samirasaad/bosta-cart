import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The product or page you’re looking for doesn’t exist or was removed.
      </p>
      <Link href="/products" className="mt-6 inline-block">
        <Button variant="primary">Back to products</Button>
      </Link>
    </div>
  );
}
