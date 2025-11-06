"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/types";
import { useCartStore } from "@/store/useCartStore";
import RequestQuoteModal from "./RequestQuoteModal";
import { Check } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isItemInCart = useCartStore((state) => state.isItemInCart(product.id));
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Предотвращаем hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    // Пытаемся добавить товар в корзину
    const success = addItem({
      id: product.id,
      title: product.title,
      subtitle: product.categories?.nodes?.[0]?.name || "",
      price: product.price || 0,
      details: product.material || "",
      size: product.size || "",
      country: product.country || "",
      year: product.year || "",
      imageUrl: product.featuredImage?.node?.sourceUrl,
    });

    // Показываем визуальную обратную связь только если товар был добавлен
    if (success) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Формируем строку характеристик с разделителями точками
  const characteristics = [
    product.material,
    product.size,
    product.country,
    product.year,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="flex flex-col justify-around gap-6 sm:gap-12 text-center h-[100%]">
      <div className="flex flex-col gap-8 sm:gap-12">
        <div className="flex flex-col ">
          {/* Категория/тип */}
          {product.categories?.nodes && product.categories.nodes.length > 0 && (
            <div className="text-base text-black mb-2 sm:mb-4">
              «{product.categories.nodes[0].name}»
            </div>
          )}

          {/* Название */}
          <h1 className="text-3xl lg:text-4xl font-gibb leading-tight mb-3">
            {product.title}
          </h1>

          {/* Цена */}
          {product.price && (
            <div className="text-2xl lg:text-2xl font-gibb">
              {formatPrice(product.price)} ₽
            </div>
          )}
        </div>

        {/* Характеристики в одну строку с точками */}
        {characteristics && (
          <div className="text-sm text-custom-gray-dark ">
            {characteristics}
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex flex-col gap-1.5 sm:gap-3 mt-2">
          <Button
            onClick={handleRequestQuote}
            size="lg"
            className="w-full rounded-none text-sm py-5 bg-custom-gray-light hover:bg-gray-50"
          >
            Оставить заявку
          </Button>
          <Button
            onClick={handleAddToCart}
            size="lg"
            disabled={mounted && (isItemInCart || isAdded)}
            className={`w-full rounded-none text-sm py-5 transition-colors ${
              mounted && isItemInCart
                ? "bg-gray-400 cursor-not-allowed text-white"
                : isAdded
                ? "bg-green-600 hover:bg-green-600 text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            {mounted && isItemInCart ? (
              <span className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5" />
                Уже в корзине
              </span>
            ) : isAdded ? (
              <span className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5" />
                Добавлено в корзину
              </span>
            ) : (
              "Добавить в корзину"
            )}
          </Button>
        </div>
      </div>

      {/* Теги/особенности */}
      {product.categories?.nodes && product.categories.nodes.length > 0 && (
        <div className="text-center">
          <div className="text-sm text-black">
            Советская живопись и графика · Пейзаж
          </div>
          <div className="text-sm text-black">Морской пейзаж</div>
        </div>
      )}

      {/* Модальное окно заявки */}
      <RequestQuoteModal
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
        productTitle={product.title}
      />
    </div>
  );
}
