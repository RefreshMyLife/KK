// app/components/ProductCard.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import CountdownTimer from "../CountDownTimer";
import { useCartStore } from "@/store/useCartStore";
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
  const addItem = useCartStore((state) => state.addItem);

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
    <div>
      <Link href={productUrl} className="relative group block">
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

        {/* Кнопка добавления в корзину при наведении */}
        {/* <button
          onClick={(e) => {
            e.preventDefault(); // Предотвращаем переход по ссылке
            handleAddToCart();
          }}
          className={`absolute bottom-4 left-1/2 -translate-x-1/2
            px-6 py-3 rounded-lg font-medium transition-all duration-300
            opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2
            ${
              isAdded
                ? "bg-green-600 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }
            flex items-center gap-2 shadow-lg z-10`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>Добавлено</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>В корзину</span>
            </>
          )}
        </button> */}
      </Link>
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

        {/* Мобильная кнопка добавления в корзину */}
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          className={`md:hidden w-full px-6 py-3 rounded-lg font-medium transition-all duration-300
            ${
              isAdded
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }
            flex items-center justify-center gap-2`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>Добавлено</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Добавить в корзину</span>
            </>
          )}
        </button> */}
      </div>
    </div>
  );
};
