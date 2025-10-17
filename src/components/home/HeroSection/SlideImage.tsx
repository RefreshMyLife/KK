import { Slide } from "./types";
import Image from "next/image";
import { SlidePagination } from "./SlidePagination";

interface SlideImageProps {
  slide: Slide;
  isAnimating: boolean;
  direction: "left" | "right";
  slides: Slide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export const SlideImage = ({
  slide,
  isAnimating,
  direction,
  slides,
  currentSlide,
  goToSlide,
}: SlideImageProps) => {
  return (
    <div
      className="relative w-full h-[30vh]  sm:h-[50vh] md:h-[70vh] lg:h-[100vh] overflow-hidden shadow-2xl flex flex-col justify-end"
      style={{
        animation: isAnimating
          ? `slideIn${direction === "right" ? "Right" : "Left"} 0.7s ease-out`
          : "none",
      }}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className="object-cover "
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      <div className="absolute bottom-7 lg:bottom-23 left-[49%] -translate-x-1/2 w-[95%] max-w-[95%]">
        <SlidePagination
          slides={slides}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
        />
      </div>
    </div>
  );
};
