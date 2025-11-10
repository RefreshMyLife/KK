import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

export type ArtworkStatusType =
  | "moderation"
  | "rejected"
  | "published"
  | "in_process"
  | "sold";

interface Artwork {
  id: string;
  image: string;
  artist: string;
  title: string;
  price: string;
  material: string;
  size: string;
  country: string;
  year: string;
  status: ArtworkStatusType;
}

interface ArtworkListItemProps {
  artwork: Artwork;
}

const statusConfig: Record<
  ArtworkStatusType,
  { label: string; color: string }
> = {
  moderation: { label: "На модерации", color: "text-black" },
  rejected: { label: "Отклонено", color: "text-[#C91212]" },
  published: { label: "Опубликовано", color: "text-[#123DC9]" },
  in_process: { label: "В процессе сделки", color: "text-[#A75326]" },
  sold: { label: "Продано", color: "text-[#12C943]" },
};

export default function ArtworkListItem({ artwork }: ArtworkListItemProps) {
  const statusInfo = statusConfig[artwork.status];

  return (
    <>
      {/* Мобильная версия */}
      <div className="md:hidden flex flex-col bg-white border-b border-[#858585]/30 last:border-b-0 p-4 relative">
        {/* Статус и кнопка меню */}
        <div className="flex justify-between items-start mb-4">
          <p className={`text-sm leading-[1.1] ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#F3F3F3] hover:bg-[#E5E5E5] transition-colors"
            aria-label="Дополнительные действия"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Изображение */}
        <div className="relative w-full aspect-square bg-[#F5F5F5] mb-4">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col gap-2 text-center">
          <h3 className="font-gibb text-xl leading-[1.1] uppercase">
            {artwork.artist}
          </h3>
          <p className="text-base leading-[1.1]">{artwork.title}</p>
          <p className="text-base leading-[1.1] font-medium mt-2">{artwork.price}</p>

          {/* Характеристики */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-[#5E5E5E] opacity-60 mt-2">
            <span>{artwork.material}</span>
            <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
            <span>{artwork.size}</span>
            <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
            <span>{artwork.country}</span>
            <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
            <span>{artwork.year}</span>
          </div>
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:grid grid-cols-[150px_1fr_200px_48px] gap-[18px] p-4 bg-white border-b border-[#858585]/30 last:border-b-0">
        {/* Изображение */}
        <div className="relative w-[150px] h-[150px] bg-[#F5F5F5]">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Основная информация */}
        <div className="flex flex-col justify-between min-h-[127px] gap-1.5">
          {/* Заголовок и название */}
          <div className="flex flex-col gap-1.5">
            <h3 className="font-gibb text-2xl leading-[1.1] uppercase">
              {artwork.artist}
            </h3>
            <p className="text-lg leading-[1.1]">{artwork.title}</p>
          </div>

          {/* Цена */}
          <p className="text-lg leading-[1.1] font-medium">{artwork.price}</p>

          {/* Характеристики */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#5E5E5E] opacity-60">
            <span>{artwork.material}</span>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
              <span>{artwork.size}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
              <span>{artwork.country}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
              <span>{artwork.year}</span>
            </div>
          </div>
        </div>

        {/* Статус */}
        <div className="flex items-start pt-1">
          <p className={`text-lg leading-[1.1] ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
        </div>

        {/* Кнопка меню */}
        <div className="flex items-start justify-center pt-1">
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#F3F3F3] hover:bg-[#E5E5E5] transition-colors"
            aria-label="Дополнительные действия"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
