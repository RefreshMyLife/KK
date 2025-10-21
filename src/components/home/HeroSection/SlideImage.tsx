import { Slide } from "./types";
import Image from "next/image";
import { SlidePagination } from "./SlidePagination";
import { useState, useEffect } from "react";

interface SlideImageProps {
  slide: Slide;
  prevSlide: Slide;
  isAnimating: boolean;
  direction: "left" | "right";
  slides: Slide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export const SlideImage = ({
  slide,
  prevSlide,
  isAnimating,
  direction,
  slides,
  currentSlide,
  goToSlide,
}: SlideImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const nextSlideIndex = (currentSlide + 1) % slides.length;
  const prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(src);
      return newSet;
    });
    setIsLoading(false);
  };

  // Сбрасываем загрузку при смене слайда
  useEffect(() => {
    setIsLoading(!loadedImages.has(slide.image));
  }, [slide, loadedImages]);

  return (
    <div className="relative w-full h-[30vh] sm:h-[50vh] md:h-[70vh] lg:h-[100vh] overflow-hidden shadow-2xl flex flex-col justify-end">
      {/* Предзагрузка соседних слайдов */}
      <div className="hidden">
        <Image
          src={slides[nextSlideIndex].image}
          alt=""
          width={1}
          height={1}
          onLoad={() => handleImageLoad(slides[nextSlideIndex].image)}
        />
        <Image
          src={slides[prevSlideIndex].image}
          alt=""
          width={1}
          height={1}
          onLoad={() => handleImageLoad(slides[prevSlideIndex].image)}
        />
      </div>

      {/* Исходящий слайд */}
      {isAnimating && (
        <div
          className="absolute inset-0 z-10"
          style={{
            animation: `slideOut${
              direction === "right" ? "Left" : "Right"
            } 0.7s ease-out forwards`,
          }}
        >
          <Image
            src={prevSlide.image}
            alt={prevSlide.title}
            fill
            priority={false}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      )}

      {/* Входящий слайд */}
      <div
        className="absolute inset-0 z-20"
        style={{
          animation: isAnimating
            ? `slideIn${direction === "right" ? "Right" : "Left"} 0.7s ease-out`
            : "none",
        }}
      >
        {/* Блюр-заглушка при загрузке */}
        {isLoading && (
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-gray-300/40 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}

        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority={currentSlide === 0}
          className={`object-cover transition-opacity duration-500 ${
            loadedImages.has(slide.image) ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 1024px) 100vw, 60vw"
          onLoad={() => handleImageLoad(slide.image)}
        />
      </div>

      {/* Пагинация */}
      <div className="absolute bottom-7 lg:bottom-23 left-[50%] -translate-x-1/2 w-[90%] max-w-[90%] z-30">
        <SlidePagination
          slides={slides}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
        />
      </div>
    </div>
  );
};
