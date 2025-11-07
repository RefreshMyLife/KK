"use client";

import { useState } from "react";
import { NewsItem } from "@/components/shared/NewsItem";
import Pagination from "@/components/shared/Pagination";
import { NewsItemData } from "@/data/mockNews";

interface NewsClientProps {
  news: NewsItemData[];
}

const ITEMS_PER_PAGE = 9; // 3 колонки × 3 ряда

export default function NewsClient({ news }: NewsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Пагинация
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNews = news.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Прокрутка к началу списка
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Сетка новостей - 3 в ряд */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentNews.map((newsItem, index) => (
          <NewsItem key={index} newsItem={newsItem} />
        ))}
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
  );
}
