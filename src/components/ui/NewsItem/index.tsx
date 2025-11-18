import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem as NewsItemType } from "@/app/types";

interface NewsItemProps {
  newsItem: NewsItemType;
}

export const NewsItem = ({ newsItem }: NewsItemProps) => {
  // Форматируем дату для отображения
  const formattedDate = new Date(newsItem.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  // Получаем изображение или используем placeholder
  const imageUrl =
    newsItem.featuredImage?.node?.sourceUrl || "/img/news/placeholder.jpg";
  const imageAlt = newsItem.featuredImage?.node?.altText || newsItem.title;

  // Получаем название категории/типа контента
  const categoryLabel = newsItem.contentType?.node?.label || "Новость";

  return (
    <Link
      href={`/news/${newsItem.slug}`}
      className="flex flex-col h-full justify-between border border-custom-gray-light overflow-hidden transition-all hover:shadow-lg hover:border-gray-300"
    >
      <div className="flex gap-4.5 flex-col justify-center items-center text-center mx-5 mt-10 mb-7">
        <span className="font-sm">{formattedDate}</span>
        <div className="space-y-2">
          <h4 className="text-lg">{categoryLabel}</h4>
          <h3 className="font-gibb text-2xl uppercase leading-none">
            {newsItem.title}
          </h3>
        </div>
      </div>
      <div className="w-full h-[400px] overflow-hidden">
        <Image
          src={imageUrl}
          width={1000}
          height={1000}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
    </Link>
  );
};
