"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NewsItem } from "./NewsItem";

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
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [index, setIndex] = useState<number>(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  const slideScale = 1.25;

  const GAP_PX = 16;
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

  // ResizeObserver: надёжно отслеживаем размер вьюпорта слайдера
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    setViewportWidth(el.clientWidth);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setViewportWidth(Math.floor(w));
      }
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, [viewportRef]);

  const next = () => setIndex((i) => (i + 1 >= newsItems.length ? 0 : i + 1));
  const prev = () =>
    setIndex((i) => (i - 1 < 0 ? newsItems.length - 1 : i - 1));

  const extended = [...newsItems, ...newsItems, ...newsItems];
  const startIndex = newsItems.length + index;

  if (viewportWidth === null) {
    return (
      <section className="w-full py-8 px-4 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            {title}
          </h2>
          <div className="flex gap-4">
            <button aria-hidden className="p-2 rounded-full opacity-0">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button aria-hidden className="p-2 rounded-full opacity-0">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative w-full"
          style={{ minHeight: 530 }}
        />
      </section>
    );
  }

  const totalGap = (visibleCount - 1) * GAP_PX;
  const baseSlideWidth = Math.floor((viewportWidth - totalGap) / visibleCount);
  const scaledSlideWidth = Math.round(baseSlideWidth * slideScale);

  const translatePx =
    (startIndex - newsItems.length) * (scaledSlideWidth + GAP_PX);

  return (
    <section className="w-full py-8 px-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold uppercase tracking-wide">{title}</h2>
        <div className="flex gap-4">
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
        ref={viewportRef}
        className="relative w-full"
        style={{ minHeight: 530 }}
      >
        <div
          className="absolute left-0 top-0 flex"
          style={{
            gap: `${GAP_PX}px`,
            transform: `translateX(-${translatePx}px)`,
            transition: "transform 500ms ease-in-out",
            willChange: "transform",
            pointerEvents: "auto",
          }}
        >
          {extended.map((newsItem, i) => (
            <div
              key={`${i}-${visibleCount}-${viewportWidth}`}
              className="flex-shrink-0"
              style={{
                width: `${scaledSlideWidth}px`,
                height: "700px",
                boxSizing: "border-box",
              }}
            >
              <NewsItem newsItem={newsItem} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
