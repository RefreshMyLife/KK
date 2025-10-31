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

  return (
    <div className="flex flex-col gap-6">
      {/* Категория/тип */}
      {product.categories?.nodes && product.categories.nodes.length > 0 && (
        <div className="text-sm text-gray-600">
          «{product.categories.nodes[0].name}»
        </div>
      )}

      {/* Название */}
      <h1 className="text-3xl lg:text-4xl font-bold">{product.title}</h1>

      {/* Цена */}
      {product.price && (
        <div className="text-2xl lg:text-3xl font-bold">
          {formatPrice(product.price)} ₽
        </div>
      )}

      {/* Характеристики */}
      {(product.material || product.size || product.country || product.year) && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {product.material && <span>{product.material}</span>}
          {product.size && <span>{product.size}</span>}
          {product.country && <span>{product.country}</span>}
          {product.year && <span>{product.year}</span>}
        </div>
      )}

      {/* Кнопки действий */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleRequestQuote}
          variant="outline"
          size="lg"
          className="w-full text-base py-6"
        >
          Оставить заявку
        </Button>
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full text-base py-6 bg-black hover:bg-gray-800"
        >
          Добавить в корзину
        </Button>
      </div>

      {/* Дополнительная информация */}
      {(product.excerpt || product.artist) && (
        <div className="border-t pt-6 space-y-4">
          {product.artist && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Художник
              </h3>
              <p className="text-base">{product.artist}</p>
            </div>
          )}

          {product.excerpt && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Описание
              </h3>
              <div
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.excerpt }}
              />
            </div>
          )}
        </div>
      )}

      {/* Теги/особенности */}
      {product.categories?.nodes && product.categories.nodes.length > 1 && (
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Советская живопись и графика · Пейзаж
          </h3>
          <p className="text-sm text-gray-600">Морской пейзаж</p>
        </div>
      )}
    </div>
  );
}
