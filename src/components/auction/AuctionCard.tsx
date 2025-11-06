"use client";

import Link from "next/link";
import Image from "next/image";
import { Auction } from "@/app/types/auction";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isEnded, setIsEnded] = useState(false);

  const imageUrl =
    auction.featuredImage?.node.sourceUrl ||
    "https://placehold.co/400x500/e5e5e5/gray?text=No+Image";

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Расчет времени до окончания аукциона
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(auction.endDate);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsEnded(true);
        setTimeLeft("Завершен");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (days > 0) {
        setTimeLeft(`${days}д ${hours}ч ${minutes}м`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
      } else {
        setTimeLeft(`${minutes}м ${seconds}с`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [auction.endDate]);

  return (
    <Link
      href={auction.link || `/auctions/${auction.slug}`}
      className="block group cursor-pointer"
    >
      {/* Изображение */}
      <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={auction.featuredImage?.node.altText || auction.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Статус аукциона */}
        {isEnded ? (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded">
            ЗАВЕРШЕН
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded">
            АКТИВЕН
          </div>
        )}

        {/* Таймер обратного отсчета */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2 text-white">
            <Clock size={16} />
            <span className="text-sm font-semibold">{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Информация */}
      <div className="space-y-2">
        {/* Категория */}
        {auction.categories?.nodes && auction.categories.nodes.length > 0 && (
          <p className="text-[12px] text-gray-500 uppercase tracking-wide">
            {auction.categories.nodes[0].name}
          </p>
        )}

        {/* Название работы */}
        <h3 className="text-[16px] font-bold text-gray-900 uppercase leading-tight group-hover:underline">
          {auction.title}
        </h3>

        {/* Автор */}
        {auction.artist && (
          <p className="text-[14px] text-gray-600">{auction.artist}</p>
        )}

        {/* Характеристики */}
        <div className="text-[13px] text-gray-600 space-y-0.5">
          {auction.material && <p>{auction.material}</p>}
          <p>
            {auction.size && `${auction.size}`}
            {auction.country && ` • ${auction.country}`}
            {auction.year && ` • ${auction.year}`}
          </p>
        </div>

        {/* Текущая ставка и количество ставок */}
        <div className="pt-2 space-y-1">
          {auction.currentBid !== undefined && auction.currentBid > 0 ? (
            <>
              <p className="text-[12px] text-gray-500">Текущая ставка:</p>
              <p className="text-[18px] font-bold text-gray-900">
                {formatPrice(auction.currentBid)}
              </p>
            </>
          ) : (
            <p className="text-[16px] font-bold text-gray-900">
              Стартовая цена не установлена
            </p>
          )}

          {auction.bidCount !== undefined && auction.bidCount > 0 && (
            <p className="text-[12px] text-gray-500">
              {auction.bidCount} {auction.bidCount === 1 ? "ставка" : "ставок"}
            </p>
          )}
        </div>

        {/* Комиссия */}
        {auction.commission && (
          <p className="text-[12px] text-gray-500 pt-1">
            Комиссия: {auction.commission}%
          </p>
        )}
      </div>
    </Link>
  );
}
