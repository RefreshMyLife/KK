"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import ContactSection from "@/components/ContactSection/ContactSection";

export default function FavoritesClient() {
  const [activeFilter, setActiveFilter] = useState<"items" | "auctions">(
    "items"
  );
  const favoriteItems = useFavoritesStore((state) => state.items);

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Избранное" },
  ];

  const filteredItems = favoriteItems;

  return (
    <div className="layout-wrapper   mt-30">
      <Breadcrumbs items={breadcrumbItems} />

      <FavoritesHeader onFilterChange={setActiveFilter} />

      {filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-custom-gray-dark mb-4">
            У вас пока нет избранных товаров
          </p>
          <p className="text-base text-custom-gray-dark">
            Добавляйте товары в избранное, наводя на них курсор и нажимая на
            иконку сердечка
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-20">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              slug={item.slug}
              title={item.title}
              subtitle={item.subtitle}
              price={`${item.price.toLocaleString("ru-RU")} ₽`}
              details={item.details}
              size={item.size}
              country={item.country}
              year={item.year}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      )}
      <div className="full-width">
        <ContactSection />
      </div>
    </div>
  );
}
