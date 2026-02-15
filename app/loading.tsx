import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[40vh]" role="status" aria-label="Loading">
      <Spinner size="lg" className="text-muted-foreground" />
    </div>
  );
}
