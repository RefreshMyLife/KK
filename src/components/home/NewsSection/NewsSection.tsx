"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NewsItem } from "@/components/ui/NewsItem";

interface News {
  title: string;
  nameOfTitle: string;
  imageUrl: string;
  date: string;
}

interface NewsProps {
  newsItems: News[];
  title: string;
}

export default function NewsSection({ newsItems, title }: NewsProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const GAP = 16;
  const SLIDE_WIDTH_MULTIPLIER = visibleCount === 1 ? 1 : 1.2; // На мобилке слайд заполняет весь экран

  useLayoutEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const next = () => setIndex((i) => (i + 1) % newsItems.length);
  const prev = () =>
    setIndex((i) => (i - 1 + newsItems.length) % newsItems.length);

  const extended = [...newsItems, ...newsItems, ...newsItems];
  const centerIndex = newsItems.length + index;

  return (
    <section className="w-full py-16 relative ml-7.5">
      <div className="flex justify-center sm:justify-between items-center mb-8 ">
        <h2 className="uppercase tracking-wide font-gibb text-4xl ">{title}</h2>
        {/* Кнопки на десктопе */}
        <div className="hidden sm:flex gap-4">
          <button
            onClick={prev}
            aria-label="Previous"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        className={`relative ${
          visibleCount === 1 ? "overflow-hidden" : "overflow-hidden"
        } `}
      >
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${
              (centerIndex - newsItems.length) *
              ((100 * SLIDE_WIDTH_MULTIPLIER) / visibleCount)
            }%)`,
          }}
        >
          {extended.map((newsItem, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width:
                  visibleCount === 1
                    ? `calc(100vw - 64px)`
                    : `calc((100vw - ${
                        GAP * (visibleCount - 1)
                      }px) / ${visibleCount} * ${SLIDE_WIDTH_MULTIPLIER})`,
                minWidth:
                  visibleCount === 1
                    ? `calc(100vw - 64px)`
                    : `calc((100vw - ${
                        GAP * (visibleCount - 1)
                      }px) / ${visibleCount} * ${SLIDE_WIDTH_MULTIPLIER})`,
              }}
            >
              <NewsItem newsItem={newsItem} />
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки на мобилке под NewsItem */}
      <div className="sm:hidden flex justify-center gap-4 mt-8 px-8">
        <button
          onClick={prev}
          aria-label="Previous"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
