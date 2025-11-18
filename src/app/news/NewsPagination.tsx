"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string | null;
}

export default function NewsPagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  nextCursor,
}: NewsPaginationProps) {
  // Если это первая страница и нет следующей, не показываем пагинацию
  if (!hasNextPage && !hasPreviousPage) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4 my-12">
      {/* Кнопка "Предыдущая" */}
      {hasPreviousPage ? (
        <Link
          href="/news"
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-100 rounded transition-colors"
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Предыдущая</span>
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-400 rounded cursor-not-allowed"
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Предыдущая</span>
        </button>
      )}

      {/* Индикатор текущей страницы */}
      <span className="text-gray-600">
        Страница {currentPage}
      </span>

      {/* Кнопка "Следующая" */}
      {hasNextPage && nextCursor ? (
        <Link
          href={`/news?page=${currentPage + 1}&cursor=${encodeURIComponent(nextCursor)}`}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-100 rounded transition-colors"
          aria-label="Следующая страница"
        >
          <span>Следующая</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-400 rounded cursor-not-allowed"
          aria-label="Следующая страница"
        >
          <span>Следующая</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
