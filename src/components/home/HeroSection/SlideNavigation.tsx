import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavigationProps {
  prevSlide: () => void;
  nextSlide: () => void;
  isAnimating: boolean;
}
export const SlideNavigation = ({
  prevSlide,
  nextSlide,
  isAnimating,
}: SlideNavigationProps) => {
  return (
    <div className="absolute bottom-6 right-8 lg:right-16 flex gap-2 z-20">
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        disabled={isAnimating}
        className="bg-white/62 hover:bg-white/30 text-black backdrop-blur-sm rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        disabled={isAnimating}
        className="bg-white/62 hover:bg-white/30 text-black backdrop-blur-sm rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};
