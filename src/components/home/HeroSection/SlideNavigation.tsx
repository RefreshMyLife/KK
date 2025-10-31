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
    <div className="absolute bottom-8 lg:bottom-30 md:bottom-15 right-8 lg:right-16 sm:right-14  flex gap-3 z-20">
      <Button
        variant="ghost"
        onClick={prevSlide}
        disabled={isAnimating}
        className="bg-white/70 hover:bg-white/40 text-black backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <ChevronLeft className="size-6" />
      </Button>
      <Button
        variant="ghost"
        onClick={nextSlide}
        disabled={isAnimating}
        className="bg-white/70 hover:bg-white/40 text-black backdrop-blur-sm rounded-full  w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
};
