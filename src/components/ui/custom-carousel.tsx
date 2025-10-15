"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CustomCarouselProps = {
  images: { src: string; alt?: string }[];
  className?: string;
};

export function CustomCarousel({ images, className }: CustomCarouselProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <Image
                src={img.src}
                alt={img.alt || `slide-${index}`}
                width={200}
                height={200}
                className="object-cover w-full h-auto rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Кастомные стрелки */}
        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm" />
        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}
