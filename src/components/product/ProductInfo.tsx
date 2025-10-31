"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/types";
import { useCartStore } from "@/store/useCartStore";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Добавляем товар в корзину
    addItem({
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
  };

  const handleRequestQuote = () => {
    // TODO: Открыть модальное окно заявки
    console.log("Оставить заявку для товара:", product.id);
    alert("Форма заявки будет реализована позже");
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
            className="w-full rounded-none text-sm py-5 bg-black hover:bg-gray-800 text-white"
          >
            Добавить в корзину
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
    </div>
  );
}
