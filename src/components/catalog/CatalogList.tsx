"use client";

import { useState, useMemo } from "react";
import { Post } from "@/app/types/post";
import CatalogFilters from "./CatalogFilters";
import { ProductCard } from "@/components/product/ProductCard";
import Pagination from "@/components/shared/Pagination";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CatalogListProps {
  products: Post[];
  categories: Category[];
}

const ITEMS_PER_PAGE = 8; // 2 колонки × 4 ряда

export default function CatalogList({
  products,
  categories,
}: CatalogListProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return products;
    }

    return products.filter((product) => {
      const productCategories = product.categories?.nodes || [];
      return productCategories.some((cat) =>
        selectedCategories.includes(cat.id)
      );
    });
  }, [products, selectedCategories]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleClearAll = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Прокрутка к началу списка товаров
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Сброс страницы при изменении фильтров
  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[455px_1fr] gap-8 xl:gap-12">
      {/* Фильтры - боковая панель */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <CatalogFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          onClearAll={handleClearAll}
        />
      </aside>

      {/* Список товаров */}
      <div>
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
              {currentProducts.map((product) => {
                const imageUrl =
                  product.featuredImage?.node.sourceUrl ||
                  "https://placehold.co/400x500/e5e5e5/gray?text=No+Image";

                return (
                  <div
                    key={product.id}
                    className="w-full max-w-[456px] mx-auto"
                  >
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      title={product.title}
                      subtitle={product.excerpt || "История одной работы"}
                      price="300 000 000 ₽"
                      details="Бумага, масло"
                      size="92×64"
                      country="Россия"
                      year="1984"
                      imageUrl={imageUrl}
                    />
                  </div>
                );
              })}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-[32px] font-gibb text-gray-900 mb-2 text-center leading-none">
              НИЧЕГО
              <br />
              НЕ НАЙДЕНО
            </h2>
            <button
              onClick={handleClearAll}
              className="mt-6 px-6 py-2.5 border border-gray-900 text-gray-900 text-[14px] font-normal hover:bg-gray-900 hover:text-white transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
