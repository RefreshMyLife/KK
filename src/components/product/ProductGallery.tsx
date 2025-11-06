"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MediaItem } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const allImages = [mainImage, ...gallery];

  return (
    <>
      <div className="w-full space-y-4">
        {/* Основное изображение */}
        <div
          className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={selectedImage.sourceUrl || "/img/placeholder.jpg"}
            alt={selectedImage.altText || title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Миниатюры галереи */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {allImages.map((image, index) => (
              <div
                key={image.id || index}
                className={`relative aspect-square bg-gray-100 overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage.id === image.id
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.sourceUrl || "/img/placeholder.jpg"}
                  alt={image.altText || title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно с изображением */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="!max-w-[95vw] !max-h-[95vh] !w-auto !h-auto p-0 bg-white border-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {selectedImage.altText || title}
          </DialogTitle>

          <div className="relative w-[95vw] h-[95vh] flex items-center justify-center bg-white">
            <Image
              src={selectedImage.sourceUrl || "/img/placeholder.jpg"}
              alt={selectedImage.altText || title}
              fill
              className="object-contain"
              quality={100}
              sizes="95vw"
            />
            <DialogClose className="absolute right-4 top-4 z-50 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none bg-black/50 hover:bg-black/70 p-2">
              <X className="h-6 w-6 text-white" />
              <span className="sr-only">Закрыть</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
