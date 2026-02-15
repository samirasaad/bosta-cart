import { LottiePlayer } from "@/components/ui/LottiePlayer";
import EmptyCartAnimation from "@/public/lotties/empty-cart.json";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LottiePlayer animationData={EmptyCartAnimation} className="w-60 mx-auto" />
    </div>
  );
}
