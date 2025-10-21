"use client";
import { useState, useEffect } from "react";
import { slides } from "./slidesData";
import { SlideText } from "./SlideText";
import { SlideImage } from "./SlideImage";
import { SlideNavigation } from "./SlideNavigation";
import "./animations.css";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlideIndex, setPreviousSlideIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedBgColor, setDisplayedBgColor] = useState(slides[0].bgColor);

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);
    setPreviousSlideIndex(currentSlide);
    const nextIndex = (currentSlide + 1) % slides.length;
    setDisplayedBgColor(slides[nextIndex].bgColor);
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);
    setPreviousSlideIndex(currentSlide);
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setDisplayedBgColor(slides[prevIndex].bgColor);
    setCurrentSlide(prevIndex);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setDirection(index > currentSlide ? "right" : "left");
    setIsAnimating(true);
    setPreviousSlideIndex(currentSlide);
    setDisplayedBgColor(slides[index].bgColor);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const animTimeout = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(animTimeout);
  }, [currentSlide]);

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
          <div className="lg:order-1 mt-6 lg:mt-0 h-full flex justify-center">
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
  );
}
