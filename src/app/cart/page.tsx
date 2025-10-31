"use client";

import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } =
    useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  // Пустая корзина
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h1 className="text-3xl font-gibb mb-4">Корзина пуста</h1>
          <p className="text-custom-gray-dark mb-8">
            Добавьте произведения искусства в корзину, чтобы оформить заказ
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Перейти к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-gibb mb-2">Корзина</h1>
        <p className="text-custom-gray-dark">
          {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"}
        </p>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>

        {/* Итоговая информация */}
        <div className="lg:col-span-1">
          <CartSummary
            totalPrice={totalPrice}
            totalItems={totalItems}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
}
