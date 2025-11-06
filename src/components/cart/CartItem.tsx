"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { CartItem as CartItemType } from "@/store/useCartStore";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onRemove }: CartItemProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex items-center gap-4 py-6 border-b border-gray-200 last:border-0">
      {/* Изображение товара */}
      <div className="relative w-20 h-20 sm:w-44 sm:h-44 flex-shrink-0 ">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="flex-1 flex items-start justify-between min-w-0">
        <div>
          <p className="text-custom-gray-dark text-xs sm:text-sm mb-1">
            {item.subtitle}
          </p>
          <h3 className="font-gibb text-sm sm:text-[24px] mb-2 uppercase">
            {item.title}
          </h3>
          <p className="text-lg  font-normal mb-2">
            {formatPrice(item.price)} ₽
          </p>
          <div className="text-xs sm:text-sm text-custom-gray-dark">
            {[item.details, item.size, item.country, item.year]
              .filter(Boolean)
              .join(" • ")}
          </div>
        </div>

        {/* Кнопка удаления */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors mt-3 text-left flex items-center gap-1"
          aria-label="Удалить товар"
        >
          <X className="w-4 h-4" />
          Удалить
        </button>
      </div>
    </div>
  );
};
