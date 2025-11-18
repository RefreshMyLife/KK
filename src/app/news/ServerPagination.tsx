import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServerPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  cursors?: { [key: number]: string }; // Храним cursors для каждой страницы
}

export default function ServerPagination({
  currentPage,
  totalPages,
  basePath = "/news",
  cursors = {},
}: ServerPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Количество видимых страниц

    if (totalPages <= showPages + 2) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Показываем страницы вокруг текущей
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Всегда показываем последнюю страницу
      pages.push(totalPages);
    }

    return pages;
  };

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath; // Первая страница без параметров
    }
    const cursor = cursors[page];
    return cursor
      ? `${basePath}?page=${page}&cursor=${encodeURIComponent(cursor)}`
      : `${basePath}?page=${page}`;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-6 mt-12 mb-8">
      {/* Кнопка "Назад" */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center justify-center w-12 h-12 rounded-full text-gray-900 hover:bg-gray-50 transition-colors"
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center justify-center w-12 h-12 rounded-full text-gray-300 cursor-not-allowed"
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Номера страниц */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-gray-300"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Link
            key={pageNumber}
            href={getPageUrl(pageNumber)}
            className={`flex items-center justify-center w-10 h-10 text-lg transition-colors ${
              isActive
                ? "text-gray-900 font-medium"
                : "text-gray-300 hover:text-gray-600"
            }`}
            aria-label={`Страница ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </Link>
        );
      })}

      {/* Кнопка "Вперед" */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center justify-center w-12 h-12 rounded-full text-gray-900 hover:bg-gray-50 transition-colors"
          aria-label="Следующая страница"
        >
          <ChevronRight className="w-6 h-6" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center justify-center w-12 h-12 rounded-full text-gray-300 cursor-not-allowed"
          aria-label="Следующая страница"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
