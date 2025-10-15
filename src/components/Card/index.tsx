// app/components/ProductCard.tsx
"use client";

import Image from "next/image";

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  details: string;
  size: string;
  country: string;
  year: string;
  imageUrl?: string;
}

export const ProductCard = ({
  title,
  subtitle,
  price,
  details,
  size,
  country,
  year,
  imageUrl,
}: ProductCardProps) => {
  return (
    <div>
      <div className="relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={400}
            className="w-full"
          />
        ) : (
          <div className="w-full aspect-square">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 justify-center items-center text-center mt-6">
        <div className="flex  flex-col gap-4 justify-center items-center">
          <p className="text-custom-gray-dark text-base">{subtitle}</p>
          <h3 className="font-gibb text-2xl">{title}</h3>
          <p className="text-lg"> {price}</p>
        </div>

        <div className="text-sm text-custom-gray-dark">
          <span>{details}</span>
          <span>•</span>
          <span>{size}</span>
          <span>•</span>
          <span>{country}</span>
          <span>•</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
};
