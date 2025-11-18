// app/components/ProductCard.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Check, Heart } from "lucide-react";
import CountdownTimer from "@/components/CountDownTimer";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import Link from "next/link";

interface ProductCardProps {
  id?: string;
  slug?: string; // Добавляем slug для ссылки
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
  id,
  slug,
  title,
  subtitle,
  price,
  details,
  size,
  country,
  year,
  imageUrl,
}: ProductCardProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const toggleFavorite = useFavoritesStore((state) => state.toggleItem);
  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(id || `${title}-${Date.now()}`)
  );

  // Предотвращение hydration error для favorites из localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Преобразуем строку цены в число
  const priceNumber = parseInt(price.replace(/[^\d]/g, "")) || 0;

  const handleAddToCart = () => {
    addItem({
      id: id || `${title}-${Date.now()}`,
      title,
      subtitle,
      price: priceNumber,
      details,
      size,
      country,
      year,
      imageUrl,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const productUrl = slug ? `/product/${slug}` : "#";

  return (
    <div className="">
      <div className="relative group">
        <Link
          href={productUrl}
          className="block bg-custom-gray-light py-6 px-3"
        >
          {imageUrl ? (
            <div className="w-full aspect-square relative overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </Link>

        {/* Кнопка избранного при наведении */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Предотвращаем переход по ссылке
            setIsAnimating(true);
            toggleFavorite({
              id: id || `${title}-${Date.now()}`,
              slug,
              title,
              subtitle,
              price: priceNumber,
              details,
              size,
              country,
              year,
              imageUrl,
            });
            setTimeout(() => setIsAnimating(false), 600);
          }}
          className="absolute top-10 right-7 w-8 h-8 rounded-full bg-white flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            hover:bg-gray-100 z-10 shadow-md"
          aria-label={mounted && isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              mounted && isFavorite ? "fill-black stroke-black" : "stroke-black"
            } ${isAnimating ? "scale-125" : "scale-100"}`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center text-center mt-6">
        <div className="flex  flex-col gap-4 justify-center items-center">
          <div className="text-black text-lg">
            <CountdownTimer initialSeconds={74020} />
          </div>
          <p className="text-custom-gray-dark text-base">{subtitle}</p>
          <Link href={productUrl}>
            <h3 className="font-gibb text-2xl max-w-[400px] hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
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
