import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse" />
      <CardHeader className="flex-1">
        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2 mt-2" />
        <div className="flex gap-1 mt-2">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
      </CardContent>
      <CardFooter className="border-t border-border bg-muted/30 flex items-center justify-center gap-3 rounded-b-lg">
        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        <div className="h-11 w-11 rounded-full bg-muted animate-pulse" />
      </CardFooter>
    </Card>
  );
}
