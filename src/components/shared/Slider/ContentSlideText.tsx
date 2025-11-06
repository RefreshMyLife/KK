import { Slide } from "./types";

interface ContentSlideTextProps {
  slide: Slide;
  isAnimating: boolean;
  direction: "left" | "right";
}

export const ContentSlideText = ({
  slide,
  isAnimating,
  direction,
}: ContentSlideTextProps) => {
  // Используем левые поля, если они определены, иначе fallback к обычным
  const displaySubtitle = slide.leftSubtitle || slide.subtitle;
  const displayTitle = slide.leftTitle || slide.title;
  const displayInfo = slide.leftInfo || slide.info;

  return (
    <div className=" flex justify-center items-center h-[80%]">
      <div className="text-center relative w-full h-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div
          className="text-white z-10 flex gap-3 flex-col max-w-xl"
          style={{
            animation: isAnimating
              ? `slideIn${
                  direction === "right" ? "Right" : "Left"
                } 0.7s ease-out`
              : "none",
          }}
        >
          {displaySubtitle && (
            <p className="text-sm md:text-base uppercase tracking-wider opacity-90 animate-fade-in">
              {displaySubtitle}
            </p>
          )}
          <h2 className="uppercase text-[36px] font-gibb leading-tight  animate-fade-in-up">
            {displayTitle}
          </h2>
          {displayInfo && (
            <p className="text-lg md:text-base text-custom-gray-dark opacity-90 leading-relaxed animate-fade-in mt-5">
              {displayInfo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
