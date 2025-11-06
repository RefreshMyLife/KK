"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import Link from "next/link";
import { X } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, clearCart, getTotalPrice, getTotalItems } =
    useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Пустая корзина
  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-gibb mb-12 uppercase leading-none">
            Корзина
            <br />
            пока пустая
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-black text-white rounded-none hover:bg-gray-800 transition-colors font-normal text-base"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/auctions"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#F5F5F0] text-black rounded-none hover:bg-gray-200 transition-colors font-normal text-base"
            >
              Перейти в аукционы
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24 layout-wrapper">
      <div className="py-8">
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
          {/* Список товаров */}
          <div>
            {/* Заголовок */}
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-3xl sm:text-4xl font-normal uppercase">
                Корзина
              </h1>
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Полностью очистить
              </button>
            </div>
            <div className="bg-white border-b border-gray-200 last:border-0 rounded-none p-4 pb-0 sm:p-6 sm:pb-0">
              {items.map((item) => (
                <CartItem key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
          </div>

          {/* Итоговая информация и форма */}
          <div>
            <CartSummary totalPrice={totalPrice} totalItems={totalItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
