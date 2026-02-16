import { LottiePlayer } from "@/components/ui/lotties/LottiePlayer";
import EmptyCartAnimation from "@/public/lotties/EmptyCartAnimation.json";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LottiePlayer animationData={EmptyCartAnimation} className="w-60 mx-auto" />
    </div>
  );
}
