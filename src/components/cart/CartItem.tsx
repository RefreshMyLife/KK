"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/store/useCartStore";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 sm:gap-6 py-6 border-b border-gray-200 last:border-0">
      {/* Изображение товара */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-custom-gray-dark text-sm mb-1">
                {item.subtitle}
              </p>
              <h3 className="font-gibb text-lg sm:text-xl mb-2 line-clamp-2">
                {item.title}
              </h3>
              <div className="text-xs sm:text-sm text-custom-gray-dark space-x-1">
                <span>{item.details}</span>
                <span>•</span>
                <span>{item.size}</span>
                <span>•</span>
                <span>{item.country}</span>
                <span>•</span>
                <span>{item.year}</span>
              </div>
            </div>

            {/* Кнопка удаления */}
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              aria-label="Удалить товар"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Цена и количество */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-white rounded transition-colors"
              aria-label="Уменьшить количество"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="min-w-[2rem] text-center font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-white rounded transition-colors"
              aria-label="Увеличить количество"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg sm:text-xl font-medium">
              {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
            </p>
            {item.quantity > 1 && (
              <p className="text-sm text-custom-gray-dark">
                {item.price.toLocaleString("ru-RU")} ₽ за шт.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
