import { Slide } from "./types";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ContentSlideImageProps {
  slide: Slide;
  prevSlide: Slide;
  isAnimating: boolean;
  direction: "left" | "right";
  slides: Slide[];
  currentSlide: number;
}

export const ContentSlideImage = ({
  slide,
  prevSlide,
  isAnimating,
  direction,
  slides,
  currentSlide,
}: ContentSlideImageProps) => {
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
            sizes="(max-width: 1024px) 100vw, 50vw"
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
          <div className="absolute inset-0 z-10 backdrop-blur-md flex items-center justify-center">
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
          sizes="(max-width: 1024px) 100vw, 50vw"
          onLoad={() => handleImageLoad(slide.image)}
        />
      </div>

      {/* Текст поверх изображения (видимый на всех экранах) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center lg:justify-end lg:items-start lg:text-left bottom-0 left-5">
        <div
          className="text-white z-10 flex gap-4 lg:gap-3 flex-col max-w-2xl"
          style={{
            animation: isAnimating
              ? `slideIn${
                  direction === "right" ? "Left" : "Right"
                } 0.7s ease-out`
              : "none",
          }}
        >
          <h2 className="uppercase text-[28px] sm:text-[32px] md:text-[36px] lg:text-[clamp(20px,3vw,24px)] leading-tight font-gibb animate-fade-in-up whitespace-pre-line">
            {slide.title}
          </h2>

          <p className="text-sm md:text-base uppercase tracking-wider opacity-90 animate-fade-in">
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
