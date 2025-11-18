"use client";

import Image from "next/image";
import { Upload, Trash2, Edit } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploadSectionProps {
  onImagesChange: (hasImages: boolean) => void;
  error?: string;
}

export default function ImageUploadSection({
  onImagesChange,
  error,
}: ImageUploadSectionProps) {
  const {
    uploadedImages,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleReplaceImage,
    openFileDialog,
  } = useImageUpload();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-[456px]">
        {/* Скрытый input для загрузки файлов */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            handleFileChange(e, () => onImagesChange(uploadedImages.length > 0))
          }
          className="hidden"
        />

        {/* Отображение загруженных изображений */}
        {uploadedImages.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {uploadedImages.map((image) => (
                <div
                  key={image.id}
                  className="relative w-full aspect-square bg-[#F5F5F5] rounded-md overflow-hidden group"
                >
                  <Image
                    src={image.preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  {/* Кнопки управления изображением */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveImage(image.id, () =>
                          onImagesChange(uploadedImages.length > 1)
                        )
                      }
                      className="p-2 bg-white rounded-md hover:bg-gray-100 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-5 h-5 text-black" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReplaceImage(image.id)}
                      className="p-2 bg-white rounded-md hover:bg-gray-100 transition-colors"
                      title="Заменить"
                    >
                      <Edit className="w-5 h-5 text-black" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Кнопка "Загрузить еще" */}
            <button
              type="button"
              onClick={openFileDialog}
              className="flex items-center gap-2 px-6 py-[19px] bg-[#F5F5F5] rounded-md text-base text-black hover:bg-gray-200 transition-colors w-fit"
            >
              Загрузить ещё
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L8 3.2M13 8L8 12.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div
            onClick={openFileDialog}
            className="flex items-center justify-center w-full h-[244px] bg-[#F5F5F5] rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <div className="flex flex-col items-center gap-1">
              <Upload className="w-8 h-8 text-[#A4A4A4]" />
              <span className="text-base text-[#A4A4A4]">
                Загрузите фотографию
              </span>
            </div>
          </div>
        )}

        {/* Ошибка валидации */}
        {error && <span className="text-red-500 text-sm mt-2 block">{error}</span>}
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-lg leading-[1.1em]">Требования к фотографиям</h4>
        <div className="flex flex-col gap-1.5">
          <p className="text-base text-[#A4A4A4]">Минимум одна фотография</p>
          <p className="text-base text-[#A4A4A4]">Хорошее качество</p>
        </div>
      </div>
    </div>
  );
}
