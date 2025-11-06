"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Auction } from "@/app/types";
import Link from "next/link";

interface AuctionInfoProps {
  auction: Auction;
}

export default function AuctionInfo({ auction }: AuctionInfoProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // Вычисляем оставшееся время до окончания аукциона
    const calculateTimeLeft = () => {
      const endDate = new Date(auction.endDate).getTime();
      const now = new Date().getTime();
      const difference = endDate - now;
      return Math.max(0, Math.floor(difference / 1000)); // в секундах
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [auction.endDate]);

  // Форматирование времени в ЧЧ:ММ:СС
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBuyNow = () => {
    console.log("Купить картину:", auction.id);
    alert("Функция покупки будет реализована позже");
  };

  const handleGetDiscount = () => {
    console.log("Преимущество 30% для:", auction.id);
    alert("Форма получения преимущества будет реализована позже");
  };

  // Формируем строку характеристик
  const characteristics = [
    auction.material,
    auction.size,
    auction.country,
    auction.year,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="flex flex-col ">
      {/* Таймер и комиссия в одной строке */}
      <div className="flex items-center  gap-5 mb-5">
        <div className="text-xl sm:text-xl font-gibb tabular-nums text-custom-blue">
          {formatTime(timeLeft)}
        </div>
        {auction.commission && (
          <div className="text-xl sm:text-lg">
            Комиссия {auction.commission}%
          </div>
        )}
      </div>

      {/* Название */}
      <div className="flex flex-col gap-2 mb-3">
        <h1 className="text-3xl lg:text-4xl font-gibb leading-tight uppercase">
          {auction.title}
        </h1>
      </div>

      {/* Описание */}
      {auction.excerpt && (
        <div className="text-left mb-3">
          <p className="text-sm leading-relaxed text-custom-gray-dark">
            {auction.excerpt}
          </p>
        </div>
      )}

      {/* Кнопки действий */}
      <div className="flex  gap-3">
        <Link href={"/"} className=" text-xl">
          Купить Картину
        </Link>
        <span className="text-xl">Преимущество 30/2</span>
      </div>
    </div>
  );
}
