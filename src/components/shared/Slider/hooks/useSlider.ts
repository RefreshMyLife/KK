import { useState, useEffect } from "react";
import { Slide } from "../types";

interface UseSliderProps {
  slides: Slide[];
}

export const useSlider = ({ slides }: UseSliderProps) => {
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

  return {
    currentSlide,
    previousSlideIndex,
    direction,
    isAnimating,
    displayedBgColor,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};
