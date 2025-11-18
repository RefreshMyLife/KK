"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatarUrl: string) => void;
}

export default function AvatarUpload({
  currentAvatar = "/img/profile/avatar-placeholder.png",
  onAvatarChange,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string>(currentAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, выберите файл изображения");
      return;
    }

    // Проверка размера файла (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Размер файла не должен превышать 5MB");
      return;
    }

    setIsLoading(true);

    try {
      // Создаем превью
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onAvatarChange(result);
      };
      reader.readAsDataURL(file);

      // TODO: Загрузить файл на сервер
      // const formData = new FormData();
      // formData.append("avatar", file);
      // const response = await fetch("/api/profile/avatar", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();
      // if (data.success) {
      //   onAvatarChange(data.avatarUrl);
      // }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Ошибка при загрузке аватара");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="relative group">
        {/* Аватар */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={preview}
            alt="Аватар профиля"
            fill
            className="object-cover"
          />
        </div>

        {/* Кнопка загрузки */}
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
        >
          <Camera className="w-8 h-8 text-white" />
        </button>

        {/* Индикатор загрузки */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Скрытый input для выбора файла */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Текст подсказки */}
      <p className="text-sm text-gray-500 text-center">
        Нажмите на аватар, чтобы изменить фото
        <br />
        <span className="text-xs">Макс. размер: 5MB</span>
      </p>
    </div>
  );
}
