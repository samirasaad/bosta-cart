import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function ProductDetailSkeleton() {
  return (
    <div
      className="w-full max-w-6xl mx-auto space-y-4 min-h-[min(500px,80vh)] md:min-h-[min(560px,85vh)]"
      role="status"
      aria-label="Loading product"
    >
      {/* Back: text-sm + icon w-5 h-5, gap-2 */}
      <div className="h-5 w-18 bg-muted rounded animate-pulse mb-7" />
      <Card className="overflow-hidden min-h-[min(420px,75vh)] md:min-h-[480px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 h-full min-h-[380px] md:min-h-[440px]">
          {/* Image: same as real — aspect-square with min size so it's big from first paint */}
          <div className="relative aspect-square min-h-[280px] md:min-h-[320px] bg-muted rounded-lg overflow-hidden animate-pulse w-full" />
          <div className="flex flex-col min-h-0">
            <CardHeader className="p-0">
              {/* Category: text-sm → h-5, mb-1 */}
              <div className="h-5 w-24 bg-muted rounded animate-pulse mb-1" />
              {/* Title: text-2xl md:text-3xl — two lines */}
              <div className="h-8 md:h-9 bg-muted rounded animate-pulse w-full max-w-md" />
              <div className="h-8 md:h-9 bg-muted rounded animate-pulse w-4/5 max-w-sm mt-1" />
              {/* Rating: mt-2, star row */}
              <div className="flex gap-1 mt-2">
                <div className="h-5 w-20 bg-muted rounded animate-pulse" />
                <div className="h-5 w-14 bg-muted rounded animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col min-h-0">
              {/* Price: text-lg font-semibold → h-7, mt-2 */}
              <div className="h-7 w-24 bg-muted rounded animate-pulse mt-2" />
              {/* Description: text-base → h-6 per line, mt-4 flex-1 */}
              <div className="space-y-2 mt-4 flex-1 min-h-24">
                <div className="h-6 bg-muted rounded animate-pulse w-full" />
                <div className="h-6 bg-muted rounded animate-pulse w-full" />
                <div className="h-6 bg-muted rounded animate-pulse w-full" />
                <div className="h-6 bg-muted rounded animate-pulse w-5/6" />
                <div className="h-6 bg-muted rounded animate-pulse w-4/5" />
              </div>
              {/* Button size lg: h-11, mt-6 */}
              <div className="h-11 w-40 bg-muted rounded-lg animate-pulse mt-6 shrink-0" />
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
