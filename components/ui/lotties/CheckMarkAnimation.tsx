import { LottiePlayer } from "@/components/ui/lotties/LottiePlayer";
import CheckMarkAnimation from "@/public/lotties/CheckMarkAnimation.json";

export function CheckMark() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LottiePlayer animationData={CheckMarkAnimation} className="w-60 mx-auto" />
    </div>
  );
}
