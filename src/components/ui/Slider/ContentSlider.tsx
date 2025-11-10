"use client";
import { HeroSliderProps } from "./types";
import { ContentSlideImage } from "./ContentSlideImage";
import { ContentSlideText } from "./ContentSlideText";
import { SlideNavigation } from "./SlideNavigation";
import { SlidePagination } from "./SlidePagination";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useSlider } from "./hooks/useSlider";
import "./animations.css";

export interface ContentSliderProps extends HeroSliderProps {
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function ContentSlider({
  slides,
  minHeight = "80vh",
  breadcrumbs,
}: ContentSliderProps) {
  const {
    currentSlide,
    previousSlideIndex,
    direction,
    isAnimating,
    displayedBgColor,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useSlider({ slides });

  const slide = slides[currentSlide];
  const nextSlideData = slides[(currentSlide + 1) % slides.length];

  return (
    <>
      {/* Breadcrumbs над слайдером на белом фоне */}
      {breadcrumbs && (
        <div className="absolute top-20 lg:top-24 left-4 md:left-8 lg:left-12 z-50">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <div
        className="relative overflow-hidden transition-all min-h-[80vh] h-[80vh]  pb-16 lg:pb-20  duration-700 ease-in-out"
        style={{ backgroundColor: displayedBgColor, minHeight }}
      >
        <div className="mx-auto h-full flex items-stretch">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full h-full">
            {/* Левая сторона - только текст (скрыта на мобильных) */}
            <div className="relative w-full h-full flex-col  lg:flex">
              <ContentSlideText
                slide={slide}
                isAnimating={isAnimating}
                direction={direction}
              />
            </div>

            {/* Правая сторона - изображение на всю высоту (на мобильных на весь экран) */}
            <div className="relative w-full h-full lg:col-span-1 col-span-1">
              {/* Изображение занимает всю высоту */}
              <ContentSlideImage
                slide={slide}
                prevSlide={slides[previousSlideIndex]}
                isAnimating={isAnimating}
                direction={direction}
                currentSlide={currentSlide}
                slides={slides}
              />

              {/* Навигация поверх изображения */}
              <div className="absolute inset-0 z-40  bottom-25 xs:bottom-35 sm:bottom-10 md:bottom-30 lg:bottom-15 pointer-events-none">
                <div className="pointer-events-auto">
                  <SlideNavigation
                    prevSlide={prevSlide}
                    nextSlide={nextSlide}
                    isAnimating={isAnimating}
                  />
                </div>
              </div>

              {/* Пагинация внизу поверх изображения */}
              <div className="absolute bottom-20 xs:bottom-30  sm:bottom-5 md:bottom-30 left-0 right-0 z-50 py-8 px-4 flex justify-center">
                <SlidePagination
                  slides={slides}
                  currentSlide={currentSlide}
                  goToSlide={goToSlide}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
