"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Pagination from "@/components/ui/pagination";
import BidHistoryCard from "@/components/profile/bid-history/BidHistoryCard";
import { mockBidHistory } from "@/data/mockBidHistory";

export default function BidHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Пагинация
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockBidHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBids = mockBidHistory.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { label: "Профиль", href: "/profile" },
    { label: "История ставок" },
  ];

  return (
    <div className="layout-wrapper px-4 pt-8 mt-30">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="grid lg:grid-cols-[1fr_4fr]">
        {/* Заголовок */}
        <h1 className="font-gibb text-2xl uppercase mb-6">История ставок</h1>
        <div className="">
          {/* Заголовки колонок - только на десктопе */}
          <div className="hidden lg:grid grid-cols-[150px_1fr_200px_48px] gap-[18px] px-4 mb-[21px]">
            <span className="text-sm opacity-40">Предмет</span>
            <span></span>
            <span className="text-sm opacity-40">Статус ставки</span>
            <span></span>
          </div>

          {/* Список ставок */}
          <div className="bg-white border-b last:border-none border-[#858585]/30 mb-8">
            {currentBids.length > 0 ? (
              currentBids.map((bid) => (
                <BidHistoryCard key={bid.id} bid={bid} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                История ставок пуста
              </div>
            )}
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
