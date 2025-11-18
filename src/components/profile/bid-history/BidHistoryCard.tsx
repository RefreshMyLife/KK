"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { BidHistoryItem, BidStatusType } from "@/data/mockBidHistory";
import NewBidModal from "./NewBidModal";

interface BidHistoryCardProps {
  bid: BidHistoryItem;
}

const statusConfig: Record<BidStatusType, { label: string; color: string }> = {
  no_bid: { label: "Ставки нет", color: "text-black" },
  won: { label: "Выиграла", color: "text-[#1EA815]" },
  outbid: { label: "Перекрыта", color: "text-[#C91212]" },
  active: { label: "Активна", color: "text-[#123DC9]" },
};

export default function BidHistoryCard({ bid }: BidHistoryCardProps) {
  const statusInfo = statusConfig[bid.status];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Мобильная версия */}
      <div className="lg:hidden flex flex-col bg-white border-b border-[#858585]/30 last:border-b-0 px-4 py-[10px] gap-3">
        {/* Статус и кнопка меню */}
        <div className="flex justify-between items-center">
          <p className={`text-lg leading-[1.1] ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#F3F3F3] hover:bg-[#E5E5E5] transition-colors rounded-none flex-shrink-0"
            aria-label="Дополнительные действия"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Изображение */}
        <div className="relative  aspect-square bg-[#F5F5F5] -mx-4">
          <Image
            src={bid.image}
            alt={bid.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4 text-center w-full">
            <h3 className="font-gibb text-2xl leading-[1.1] uppercase">
              {bid.artist}
            </h3>
            <p className="text-lg leading-[1.1]">«{bid.title}»</p>
            <p className="text-lg leading-[1.1]">
              Последняя ставка: {bid.lastBid}
            </p>

            {/* Характеристики */}
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-[#5E5E5E] opacity-60">
              <span>Мин. стоимость {bid.minPrice}</span>
              <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
              <span>Шаг {bid.step}</span>
            </div>
          </div>

          {/* Кнопка */}
          {bid.status === "outbid" && bid.artworkId && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-6 py-[19px] bg-[#F5F5F5] hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 text-base leading-[1.1]"
            >
              Новая ставка
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden hover:bg-custom-gray-light lg:grid grid-cols-[150px_1fr_200px_48px] gap-[18px] p-4 bg-white border-b border-[#858585]/30 last:border-b-0">
        {/* Изображение */}
        <div className="relative w-[150px] h-[150px] bg-[#F5F5F5]">
          <Image
            src={bid.image}
            alt={bid.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Основная информация */}
        <div className="flex flex-col justify-between min-h-[127px] gap-1.5">
          {/* Заголовок и название */}
          <div className="flex flex-col gap-1.5">
            <h3 className="font-gibb text-2xl leading-[1.1] uppercase">
              {bid.artist}
            </h3>
            <p className="text-lg leading-[1.1]">{bid.title}</p>
          </div>

          {/* Последняя ставка */}
          <p className="text-lg leading-[1.1]">
            Последняя ставка: {bid.lastBid}
          </p>

          {/* Характеристики */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#5E5E5E] opacity-60">
            <span>Минимальная стоимость {bid.minPrice}</span>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#5E5E5E]" />
              <span>Шаг {bid.step}</span>
            </div>
          </div>
        </div>

        {/* Статус */}
        <div className="flex flex-col items-start pt-1 gap-3">
          <p className={`text-lg leading-[1.1] ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
          {bid.status === "outbid" && bid.artworkId && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-4 bg-[#F5F5F5] hover:bg-black hover:text-white transition-colors flex items-center gap-2 text-base leading-[1.1] whitespace-nowrap"
            >
              Новая ставка
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
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

      {/* Модальное окно для новой ставки */}
      <NewBidModal open={isModalOpen} onOpenChange={setIsModalOpen} bid={bid} />
    </>
  );
}
