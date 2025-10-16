import React from "react";
import Image from "next/image";
interface NewsItem {
  title: string;
  nameOfTitle: string;
  imageUrl: string;
  date: string;
}
interface NewsItemProps {
  newsItem: NewsItem;
}

export const NewsItem = ({ newsItem }: NewsItemProps) => {
  return (
    <div className="border border-custom-gray-light">
      <div className="flex gap-4.5 flex-col justify-center items-center text-center mx-5 mt-10 mb-7">
        <span className="font-sm">{newsItem.date}</span>
        <div className="space-y-2">
          <h4 className="text-lg ">{newsItem.nameOfTitle}</h4>
          <h3 className="font-gibb text-2xl">{newsItem.title}</h3>
        </div>
      </div>
      <Image
        src={newsItem.imageUrl}
        width={1000}
        height={1000}
        alt={newsItem.title}
        className="w-full h-full object-cover "
      />
    </div>
  );
};
