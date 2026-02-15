import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-square bg-muted animate-pulse" />
          <CardHeader>
            <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
