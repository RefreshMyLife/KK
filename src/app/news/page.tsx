import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import NewsGrid from "./NewsGrid";
import ServerPagination from "./ServerPagination";
import { Metadata } from "next";
import { getAllNews } from "@/services/news";
import ContactSection from "@/components/ContactSection/ContactSection";

export const metadata: Metadata = {
  title: "Новости | Аукцион произведений искусства",
  description: "Актуальные новости мира искусства и аукционных торгов",
};

const ITEMS_PER_PAGE = 12;

interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
    cursor?: string;
  }>;
}

// Функция для получения примерного количества новостей
async function getTotalNewsCount(): Promise<number> {
  // Получаем первую партию для подсчета
  const newsData = await getAllNews(100);
  let count = newsData.nodes.length;

  // Если есть еще страницы, добавляем приблизительное количество
  // Это грубая оценка, но достаточная для пагинации
  if (newsData.pageInfo.hasNextPage) {
    // Предполагаем что еще есть минимум 50 новостей
    count += 50;
  }

  return count;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const cursor = params.cursor;

  // Получаем новости для текущей страницы
  const newsData = await getAllNews(ITEMS_PER_PAGE, cursor);
  const news = newsData.nodes;
  const { hasNextPage, endCursor } = newsData.pageInfo;

  // Вычисляем примерное количество страниц
  let totalPages = currentPage;
  if (currentPage === 1) {
    // На первой странице делаем оценку общего количества
    const totalCount = await getTotalNewsCount();
    totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  } else if (hasNextPage) {
    // Если есть следующая страница, показываем как минимум currentPage + 1
    totalPages = currentPage + 1;
  }

  // Формируем cursors для пагинации
  const cursors: { [key: number]: string } = {};
  if (endCursor && hasNextPage) {
    cursors[currentPage + 1] = endCursor;
  }

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Новости" },
  ];

  return (
    <div className="layout-wrapper mt-30">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Заголовок страницы */}
      <h1 className="font-gibb text-4xl uppercase mb-12">Новости</h1>

      {/* Сетка новостей */}
      <NewsGrid news={news} />

      {/* Серверная пагинация с визуалом из NewsClient */}
      {totalPages > 1 && (
        <ServerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          cursors={cursors}
        />
      )}

      <ContactSection />
    </div>
  );
}
