"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

import ArtworkFilters, {
  ArtworkStatus,
} from "@/components/profile/my-artworks/ArtworkFilters";
import ArtworkListItem from "@/components/profile/my-artworks/ArtworkListItem";
import { mockArtworks } from "@/data/mockArtworks";
import Pagination from "@/components/ui/pagination";

export default function MyArtworksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<ArtworkStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтрация
  const filteredArtworks = mockArtworks.filter((artwork) => {
    // Фильтр по поиску
    const matchesSearch =
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Фильтр по статусу
    const matchesStatus =
      activeStatus === "all" ||
      (activeStatus === "published" && artwork.status === "published") ||
      (activeStatus === "sold" && artwork.status === "sold");

    return matchesSearch && matchesStatus;
  });

  // Пагинация
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { label: "Профиль", href: "/profile" },
    { label: "Мои картины" },
  ];

  return (
    <div className="layout-wrapper px-4 pt-8 mt-30">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Заголовок */}
      <h1 className="font-gibb text-3xl md:text-4xl uppercase mb-6">
        Мои картины
      </h1>

      <div className="grid md:grid-cols-[1fr_3fr] gap-6">
        <div>
          {/* Кнопка добавления */}
          <button className="mb-8 px-5 py-2.5 hover:bg-black bg-custom-gray-light hover:text-white transition-colors hidden md:block">
            Добавить новую
          </button>
        </div>

        <div>
          {/* Фильтры и поиск */}
          <ArtworkFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
          />

          {/* Список картин */}
          <div className="mb-8">
            {/* Заголовки колонок - только на десктопе */}
            <div className="hidden md:grid grid-cols-[150px_1fr_200px_48px] gap-[18px] px-4 mb-[21px]">
              <span className="text-sm opacity-40">Предмет</span>
              <span></span>
              <span className="text-sm opacity-40">Статус</span>
              <span></span>
            </div>

            {/* Список */}
            <div className="bg-white border-b last:border-none border-[#858585]/30">
              {currentArtworks.length > 0 ? (
                currentArtworks.map((artwork) => (
                  <ArtworkListItem key={artwork.id} artwork={artwork} />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Картины не найдены
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
