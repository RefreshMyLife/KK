"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/Card";

interface Product {
  title: string;
  subtitle: string;
  price: string;
  details: string;
  size: string;
  country: string;
  year: string;
  imageUrl?: string;
}

interface ProductSliderProps {
  title: string;
  products: Product[];
}

export default function ProductSection({
  title,
  products,
}: ProductSliderProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width < 640) setVisibleCount(1); // mobile
      else if (width < 1024) setVisibleCount(2); // tablet
      else setVisibleCount(3); // desktop
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);
  const next = () => {
    setIndex((i) => {
      const newIndex = i + 1;
      if (newIndex >= products.length) {
        return 0;
      }
      return newIndex;
    });
  };

  const prev = () => {
    setIndex((i) => {
      const newIndex = i - 1;
      if (newIndex < 0) {
        return products.length - 1;
      }
      return newIndex;
    });
  };

  const extended = [...products, ...products, ...products];
  const startIndex = products.length + index;

  return (
    <section className="w-full py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-centertext-2xl font-gibb text-4xl uppercase ml-3">
          <h2>{title}</h2>
          <span>→</span>
        </div>

        <div className="flex gap-2">
          <button onClick={prev} aria-label="Previous">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={next} aria-label="Next">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Слайдер */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
          }}
        >
          {extended.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
