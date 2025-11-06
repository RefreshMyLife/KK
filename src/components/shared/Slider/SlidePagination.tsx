import { Slide } from "./types";

interface SlidePaginationProps {
  slides: Slide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export const SlidePagination = ({
  slides,
  currentSlide,
  goToSlide,
}: SlidePaginationProps) => {
  return (
    <div className="flex justify-center gap-2 w-full">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-1 transition-all duration-500 ease-out ${
            index === currentSlide ? "flex-[2]" : "flex-[1]"
          }`}
          style={{
            backgroundColor:
              index === currentSlide ? "white" : "rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  );
};
