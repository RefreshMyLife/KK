import { Button } from "@/components/ui/button";
import { Slide } from "./types";
import CountdownTimer from "@/components/CountDownTimer";

interface SlideTextProps {
  slide: Slide;
  isAnimating: boolean;
  direction: "left" | "right";
  initialSeconds: number;
}
export const SlideText = ({
  slide,
  isAnimating,
  direction,
  initialSeconds,
}: SlideTextProps) => {
  return (
    <div className="flex flex-col items-center justify-around  2xl:mt-10 2xl:mb-30 gap-10   lg:gap-25 text-center">
      <div
        className="text-white z-10  flex gap-4 flex-col justify-center items-center text-center"
        style={{
          animation: isAnimating
            ? `slideIn${direction === "right" ? "Left" : "Right"} 0.7s ease-out`
            : "none",
        }}
      >
        <p className="text-sm uppercase tracking-wider opacity-80 animate-fade-in">
          {slide.subtitle}
        </p>
        <h1 className=" text-center  uppercase text-[clamp(44px,4vw,72px)]  leading-none font-gibb  whitespace-pre-line animate-fade-in-up">
          {slide.title}
        </h1>
        <span className="text-white text-lg animate-fade-in">
          {slide.date ? (
            slide.date
          ) : (
            <CountdownTimer initialSeconds={initialSeconds} />
          )}
        </span>
      </div>
      <Button className="bg-white text-gray-900 hover:bg-gray-100 border-0 px-8 py-6 text-base animate-fade-in-up hover:scale-105 transition-transform duration-300">
        {slide.buttonText}
      </Button>
      <div className=" bottom-6 left-8 text-custom-gray-dark text-xs z-10 animate-fade-in">
        {slide.infoTitle ?? <span>{slide.infoTitle}</span>}
        <p className="text-white">{slide.info}</p>
      </div>
    </div>
  );
};
