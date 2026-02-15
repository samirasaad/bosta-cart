import { LottiePlayer } from "@/components/ui/LottiePlayer";
import HeartAnimation from "@/public/lotties/HeartAnimation.json";

export function Heart() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LottiePlayer animationData={HeartAnimation} className="w-60 mx-auto" />
    </div>
  );
}
