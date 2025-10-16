"use client";

import { useState, useEffect } from "react";
import { slides } from "./slidesData";
import { SlideText } from "./SlideText";
import { SlideImage } from "./SlideImage";
import { SlideNavigation } from "./SlideNavigation";
import "./animations.css";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);
    setCurrentSlide((p) => (p + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);
    setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setDirection(index > currentSlide ? "right" : "left");
    setIsAnimating(true);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const t = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(t);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div
      className="relative min-h-[100vh] lg:h-screen overflow-hidden transition-all duration-700 ease-in-out py-16 lg:py-20 "
      style={{ backgroundColor: slide.bgColor }}
    >
      <div className="mx-auto h-full  flex items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-7.5 w-full h-full items-center">
          <div className="relative  w-full h-full lg:order-2 ">
            <SlideImage
              slide={slide}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
