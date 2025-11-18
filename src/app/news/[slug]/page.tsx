import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getNewsBySlug, getAllNews } from "@/services/news";
import ContactSection from "@/components/ContactSection/ContactSection";
import { removeImagesFromHtml } from "@/lib/utils";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Генерация статических параметров для всех новостей
export async function generateStaticParams() {
  try {
    const newsData = await getAllNews(100);
    return newsData.nodes.map((news) => ({
      slug: news.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for news:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Новость не найдена",
    };
  }

  return {
    title: `${news.title} | Новости`,
    description: news.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  // Форматируем дату для отображения
  const formattedDate = new Date(news.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Получаем изображение или используем placeholder
  const imageUrl =
    news.featuredImage?.node?.sourceUrl || "/img/news/placeholder.jpg";
  const imageAlt = news.featuredImage?.node?.altText || news.title;

  // Удаляем изображения из контента, чтобы избежать дублирования
  const cleanContent = removeImagesFromHtml(news.content);

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Новости", href: "/news" },
    { label: news.title },
  ];

  return (
    <div className="layout-wrapper mt-30">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Контейнер для новости */}
      <article className="max-w-4xl mx-auto">
        {/* Заголовок и дата */}
        <header className="mb-8">
          <h1 className="font-gibb text-4xl md:text-5xl uppercase mb-4 leading-tight">
            {news.title}
          </h1>
          <time
            dateTime={news.date}
            className="text-gray-500 text-sm block mb-6"
          >
            {formattedDate}
          </time>
        </header>

        {/* Изображение новости */}
        {news.featuredImage && (
          <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Контент новости */}
        <div
          className="news-content text-gray-700 leading-relaxed mb-12
            [&_h1]:font-gibb [&_h1]:text-3xl [&_h1]:uppercase [&_h1]:mb-4 [&_h1]:mt-8
            [&_h2]:font-gibb [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:mb-3 [&_h2]:mt-6
            [&_h3]:font-gibb [&_h3]:text-xl [&_h3]:uppercase [&_h3]:mb-2 [&_h3]:mt-4
            [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7
            [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
            [&_strong]:text-gray-900 [&_strong]:font-semibold
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
            [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
            [&_.detail__description-holder]:mb-6
            [&_.detail__anons]:text-justify"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
      </article>

      <ContactSection />
    </div>
  );
}
