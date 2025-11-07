"use client";

import { useState, useMemo } from "react";
import { Auction } from "@/app/types/auction";
import { ProductCard } from "@/components/product/ProductCard";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import Pagination from "@/components/shared/Pagination";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface AuctionListProps {
  auctions: Auction[];
  categories: Category[];
}

const ITEMS_PER_PAGE = 8; // 2 колонки × 4 ряда

export default function AuctionList({
  auctions,
  categories,
}: AuctionListProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "ended">(
    "active"
  );

  // Фильтрация аукционов
  const filteredAuctions = useMemo(() => {
    let filtered = auctions;

    // Фильтр по статусу
    if (statusFilter !== "all") {
      filtered = filtered.filter((auction) => {
        const now = new Date();
        const endDate = new Date(auction.endDate);
        const isActive = endDate > now;

        return statusFilter === "active" ? isActive : !isActive;
      });
    }

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((auction) => {
        const auctionCategories = auction.categories?.nodes || [];
        return auctionCategories.some((cat) =>
          selectedCategories.includes(cat.id)
        );
      });
    }

    return filtered;
  }, [auctions, selectedCategories, statusFilter]);

  // Пагинация
  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAuctions = filteredAuctions.slice(startIndex, endIndex);

  const handleClearAll = () => {
    setSelectedCategories([]);
    setStatusFilter("active");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Прокрутка к началу списка
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Сброс страницы при изменении фильтров
  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: "all" | "active" | "ended") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="">
      {/* Список аукционов */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
          {currentAuctions.map((auction) => {
            const imageUrl =
              auction.featuredImage?.node.sourceUrl ||
              "https://placehold.co/400x500/e5e5e5/gray?text=No+Image";

            // Форматирование цены
            const formatPrice = (price: number) => {
              return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
              }).format(price);
            };

            const price =
              auction.currentBid !== undefined && auction.currentBid > 0
                ? formatPrice(auction.currentBid)
                : "Цена не установлена";

            return (
              <div key={auction.id} className="w-full max-w-[456px] mx-auto">
                <ProductCard
                  id={auction.id}
                  slug={auction.slug}
                  title={auction.title}
                  subtitle={auction.artist || ""}
                  price={price}
                  details={auction.material || ""}
                  size={auction.size || ""}
                  country={auction.country || ""}
                  year={auction.year || ""}
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
      </div>
    </div>
  );
}
