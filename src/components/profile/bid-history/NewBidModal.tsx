"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BidHistoryItem } from "@/data/mockBidHistory";

interface NewBidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bid: BidHistoryItem;
}

export default function NewBidModal({
  open,
  onOpenChange,
  bid,
}: NewBidModalProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  // Парсим минимальную цену и шаг (убираем пробелы и символы валюты)
  const parsePrice = (price: string): number => {
    return parseInt(price.replace(/[^\d]/g, ""), 10);
  };

  const minPrice = parsePrice(bid.minPrice);
  const step = parsePrice(bid.step);
  const lastBid = parsePrice(bid.lastBid);
  const minimumBid = lastBid + step;

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ""); // Только цифры
    setBidAmount(value);
    setError("");
  };

  const handleSubmit = () => {
    const amount = parseInt(bidAmount, 10);

    if (!bidAmount || isNaN(amount)) {
      setError("Введите сумму ставки");
      return;
    }

    if (amount < minimumBid) {
      setError(`Минимальная ставка: ${minimumBid.toLocaleString("ru-RU")} ₽`);
      return;
    }

    // Здесь будет логика отправки ставки на сервер
    console.log("Новая ставка:", amount);
    onOpenChange(false);
    setBidAmount("");
  };

  const formatPrice = (value: string): string => {
    if (!value) return "";
    const numValue = parseInt(value, 10);
    return numValue.toLocaleString("ru-RU");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[488px] p-10 gap-16 bg-white">
        {/* Заголовок и основная информация */}
        <div className="flex flex-col items-center gap-8">
          {/* Информация о работе */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Название работы */}
            <h3 className="text-base leading-[1.1] text-center w-full">
              {bid.title}
            </h3>

            {/* Изображение */}
            <div className="relative w-[247px] h-[165px] bg-[#F0F0F0]">
              <Image
                src={bid.image}
                alt={bid.title}
                fill
                className="object-contain p-3.5"
              />
            </div>

            {/* Имя художника */}
            <DialogTitle className="font-gibb text-4xl leading-[1.11] uppercase text-center w-full">
              {bid.artist}
            </DialogTitle>

            {/* Характеристики */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="flex flex-wrap justify-center items-center gap-3 text-sm opacity-60">
                {bid.medium && <span>{bid.medium}</span>}
                {bid.dimensions && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-black opacity-30" />
                    <span>{bid.dimensions}</span>
                  </>
                )}
                {bid.country && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-black opacity-30" />
                    <span>{bid.country}</span>
                  </>
                )}
                {bid.year && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-black opacity-30" />
                    <span>{bid.year}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Информация о ставке */}
          <div className="flex flex-col gap-6 w-full">
            {/* Текущая цена */}
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex flex-col gap-0.5 w-full">
                <h4 className="font-gibb text-4xl leading-[1.11] text-center w-full">
                  {bid.lastBid}
                </h4>
                <div className="flex justify-center items-center gap-3 text-base leading-[1.1] w-full">
                  <span>Последняя ставка</span>
                  <span className="w-1 h-1 rounded-full bg-black" />
                  <span>{bid.lastBidder || "Арина"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Минимальные значения */}
          <div className="flex flex-col gap-6 w-full">
            {/* Минимальные требования */}
            <div className="flex flex-col gap-1 w-full">
              {/* Минимальная стоимость */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center gap-1 w-full">
                  <div className="flex items-center gap-1">
                    <span className="text-sm leading-[1.2]">
                      Минимальная стоимость
                    </span>
                  </div>
                  <span className="text-lg leading-[1.1]">{bid.minPrice}</span>
                </div>
              </div>

              {/* Минимальный шаг */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center gap-1 w-full">
                  <div className="flex items-center gap-1">
                    <span className="text-sm leading-[1.2]">
                      Минимальный шаг
                    </span>
                  </div>
                  <span className="text-lg leading-[1.1]">{bid.step}</span>
                </div>
              </div>
            </div>

            {/* Форма ввода ставки */}
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-col gap-6 w-full">
                {/* Поле ввода */}
                <div className="relative w-full">
                  <Input
                    type="text"
                    value={bidAmount ? formatPrice(bidAmount) : ""}
                    onChange={handleBidChange}
                    placeholder={`Введите ставку от ${minimumBid.toLocaleString(
                      "ru-RU"
                    )} ₽`}
                    className={`w-full px-5 py-1 bg-[#F5F5F5] border-0 text-base leading-[1.1] placeholder:text-[#A4A4A4] ${
                      error ? "ring-2 ring-red-500" : ""
                    }`}
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                  )}
                </div>

                {/* Кнопка отправки */}
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-5 bg-black text-white text-base leading-[1.1] hover:bg-black/90 transition-colors"
                >
                  Предложить
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
