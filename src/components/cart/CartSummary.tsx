"use client";

import Link from "next/link";

interface CartSummaryProps {
  totalPrice: number;
  totalItems: number;
  onClearCart: () => void;
}

export const CartSummary = ({
  totalPrice,
  totalItems,
  onClearCart,
}: CartSummaryProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
      <h2 className="text-2xl font-gibb mb-6">Итого</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-base">
          <span className="text-custom-gray-dark">Товаров:</span>
          <span className="font-medium">{totalItems}</span>
        </div>

        <div className="flex justify-between text-base">
          <span className="text-custom-gray-dark">Стоимость товаров:</span>
          <span className="font-medium">
            {totalPrice.toLocaleString("ru-RU")} ₽
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-xl font-medium">
            <span>Общая сумма:</span>
            <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full bg-black text-white text-center py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Оформить заказ
        </Link>

        <Link
          href="/"
          className="block w-full bg-white border border-gray-300 text-center py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Продолжить покупки
        </Link>

        <button
          onClick={onClearCart}
          className="w-full text-red-600 hover:text-red-700 py-2 text-sm transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-custom-gray-dark space-y-2">
        <p className="flex items-start gap-2">
          <span>✓</span>
          <span>Бесплатная доставка по Москве</span>
        </p>
        <p className="flex items-start gap-2">
          <span>✓</span>
          <span>Гарантия подлинности произведений</span>
        </p>
        <p className="flex items-start gap-2">
          <span>✓</span>
          <span>Экспертиза и сертификаты</span>
        </p>
      </div>
    </div>
  );
};
