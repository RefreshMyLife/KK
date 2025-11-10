"use client";
import { HeroSliderProps } from "./types";
import { SlideText } from "./SlideText";
import { SlideImage } from "./SlideImage";
import { SlideNavigation } from "./SlideNavigation";
import { useSlider } from "./hooks/useSlider";
import Image from "next/image";
import "./animations.css";

export default function HeroSlider({
  slides,
  initialSeconds = 5600,
  showTimer = false,
  minHeight = "100vh",
}: HeroSliderProps) {
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

  return (
    <div
      className="relative min-h-[100vh] lg:h-screen overflow-hidden transition-all duration-700 ease-in-out py-16 lg:py-20"
      style={{ backgroundColor: displayedBgColor }}
    >
      <div className="mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-7.5 w-full h-full items-center">
          <div className="relative w-full h-full lg:order-2">
            <SlideImage
              slide={slide}
              prevSlide={slides[previousSlideIndex]}
              isAnimating={isAnimating}
              direction={direction}
              currentSlide={currentSlide}
              goToSlide={goToSlide}
              slides={slides}
            />
            <SlideNavigation
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              isAnimating={isAnimating}
            />
          </div>
          <div className="relative lg:order-1 mt-6 lg:mt-0 h-full flex justify-center items-center">
            {/* Фоновое изображение для всего блока SlideText */}
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image
                src={"/img/hero-slider/decorate.svg"}
                width={800}
                height={800}
                alt=""
                className="w-full h-full max-w-full max-h-full object-contain"
                priority
              />
            </div> */}

            {/* Контент SlideText поверх фона */}
            <div className="relative z-10 w-full">
              <SlideText
                slide={slide}
                isAnimating={isAnimating}
                direction={direction}
                initialSeconds={5600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
