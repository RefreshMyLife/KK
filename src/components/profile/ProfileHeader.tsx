"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface ProfileStats {
  itemsSold: number;
  auctionParticipations: number;
}

interface ProfileHeaderProps {
  name: string;
  avatarUrl?: string;
  stats: ProfileStats;
  onNameChange?: (newName: string) => void;
}

export default function ProfileHeader({
  name,
  avatarUrl,
  stats,
  onNameChange,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  // Фокус на input при входе в режим редактирования
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setEditedName(name);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedName.trim() && editedName !== name) {
      onNameChange?.(editedName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-6 w-full">
      {/* Аватар */}
      <div className="relative w-[175px] h-[210px] shrink-0">
        <Image
          src={avatarUrl || "/img/profile/avatar-placeholder.png"}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Информация */}
      <div className="flex flex-col items-center md:items-start gap-3 md:gap-8 flex-1 w-full">
        {/* Имя */}
        <div className="flex gap-3 items-start w-full justify-center md:justify-start">
          <div className="flex-1 min-w-0 text-center md:text-left">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full font-gibb text-[36px] leading-[1.11] uppercase tracking-tight bg-transparent border-b-2 border-black outline-none focus:border-custom-blue transition-colors text-center md:text-left"
              />
            ) : (
              <h2 className="font-gibb text-[36px] leading-[1.11] uppercase tracking-tight break-words">
                {name}
              </h2>
            )}
          </div>
          <button
            onClick={handleEditClick}
            className="relative w-[60px] h-[40px] flex-shrink-0 bg-[#F5F5F5]  items-center justify-center hover:bg-custom-gray-light transition-all duration-300 ease-in-out cursor-pointer md:block hidden"
          >
            <Image
              src={"/img/profile/icon-pen.svg"}
              alt="Редактировать"
              width={54}
              height={40}
              className="object-contain"
            />
          </button>
        </div>

        {/* Статистика */}
        <div className="flex flex-row justify-center md:justify-start items-center gap-4 w-full md:w-[270px]">
          {/* Продано предметов */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-gibb text-[24px] leading-[1.1] uppercase">
              {stats.itemsSold}
            </span>
            <span className="text-sm leading-[1.2] text-[#A4A4A4] w-[91px] text-center md:text-left">
              Предметов продано
            </span>
          </div>

          {/* Участий в аукционе */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-gibb text-[24px] leading-[1.1] uppercase">
              {stats.auctionParticipations}
            </span>
            <span className="text-sm leading-[1.2] text-[#A4A4A4] w-[89px] text-center md:text-left">
              Участий в аукционе
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
