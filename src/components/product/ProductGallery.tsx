"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MediaItem } from "@/app/types";

interface ProductGalleryProps {
  mainImage: MediaItem;
  gallery?: MediaItem[];
  title: string;
}

export default function ProductGallery({
  mainImage,
  gallery = [],
  title,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<MediaItem>(mainImage);

  // Все изображения (главное + галерея)
  const allImages = [mainImage, ...gallery];

  return (
    <div className="w-full">
      {/* Основное изображение */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
        <Image
          src={selectedImage.sourceUrl || "/img/placeholder.jpg"}
          alt={selectedImage.altText || title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Миниатюры (если есть больше 1 изображения) */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square border-2 transition-all overflow-hidden ${
                selectedImage.id === image.id
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={image.sourceUrl || "/img/placeholder.jpg"}
                alt={image.altText || `${title} - изображение ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
