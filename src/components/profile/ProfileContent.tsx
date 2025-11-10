"use client";
import Image from "next/image";
import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileMenu from "./ProfileMenu";
import ArtworkCard from "./ArtworkCard";

interface ProfileContentProps {
  initialName: string;
  avatarUrl: string;
  stats: {
    itemsSold: number;
    auctionParticipations: number;
  };
}

export default function ProfileContent({
  initialName,
  avatarUrl,
  stats,
}: ProfileContentProps) {
  const [userName, setUserName] = useState(initialName);

  const handleNameChange = (newName: string) => {
    setUserName(newName);
    // Здесь можно добавить API вызов для сохранения имени на сервере
    console.log("Имя изменено на:", newName);
  };

  return (
    <main className="min-h-screen relative bg-white flex items-start justify-center py-8 px-4 ">
      {/* Фоновое изображение на весь экран */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src={"/img/profile/bg.png"}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Основной контейнер профиля */}
      <div className="w-full max-w-[543px] bg-white self-center rounded-lg shadow-sm relative z-10">
        {/* Внутренний контейнер с padding из макета */}
        <div className="flex flex-col gap-2.5 p-[20px_12px_12px]">
          {/* Блок с профилем */}
          <div className="flex flex-col items-center gap-3">
            <ProfileHeader
              name={userName}
              avatarUrl={avatarUrl}
              stats={stats}
              onNameChange={handleNameChange}
            />
          </div>

          {/* Меню навигации */}
          <div className="flex flex-col">
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Карточка товара в правом нижнем углу */}
      <ArtworkCard
        artistName="Глебов Федор Петрович"
        artworkTitle="«У Чёрного моря»"
        href="/product/u-chernogo-morya"
      />
    </main>
  );
}
