"use client";

import Link from "next/link";

interface ArtworkCardProps {
  artistName: string;
  artworkTitle: string;
  href: string;
}

export default function ArtworkCard({
  artistName,
  artworkTitle,
  href,
}: ArtworkCardProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-6 right-6 w-[264px] h-[73px] bg-black rounded-lg group hover:scale-105 transition-transform duration-200"
    >
      <div className="relative w-full h-full">
        {/* Текстовый контент */}
        <div className="absolute left-4 top-4 flex flex-col gap-1 w-[188px]">
          {/* Имя художника */}
          <span className="text-xs font-light leading-[1.4] text-white opacity-60">
            {artistName}
          </span>

          {/* Название работы */}
          <h4 className="text-lg font-normal leading-[1.1] text-white">
            {artworkTitle}
          </h4>
        </div>

        {/* Кнопка-иконка */}
        <div className="absolute right-4 top-[21px] w-8 h-8 rounded-full bg-white/16 flex items-center justify-center group-hover:bg-white/25 transition-colors">
          {/* Стрелка вправо */}
          <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 7L1 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
