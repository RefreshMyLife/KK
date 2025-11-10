import { useState, useRef } from "react";

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export function useImageUpload() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess?: () => void
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];

    Array.from(files).forEach((file) => {
      // Проверка типа файла
      if (!file.type.startsWith("image/")) {
        alert(`Файл ${file.name} не является изображением`);
        return;
      }

      // Проверка размера файла (макс 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Файл ${file.name} слишком большой (макс. 10MB)`);
        return;
      }

      const id = Math.random().toString(36).substring(7);
      const preview = URL.createObjectURL(file);

      newImages.push({ id, file, preview });
    });

    setUploadedImages([...uploadedImages, ...newImages]);

    // Callback при успешной загрузке
    if (newImages.length > 0 && onSuccess) {
      onSuccess();
    }

    // Сбрасываем input для возможности повторной загрузки того же файла
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (id: string, onRemove?: () => void) => {
    const image = uploadedImages.find((img) => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    const filtered = uploadedImages.filter((img) => img.id !== id);
    setUploadedImages(filtered);

    // Callback при удалении
    if (onRemove) {
      onRemove();
    }
  };

  const handleReplaceImage = (id: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Проверка типа файла
      if (!file.type.startsWith("image/")) {
        alert("Файл не является изображением");
        return;
      }

      // Проверка размера файла
      if (file.size > 10 * 1024 * 1024) {
        alert("Файл слишком большой (макс. 10MB)");
        return;
      }

      // Удаляем старый preview
      const oldImage = uploadedImages.find((img) => img.id === id);
      if (oldImage) {
        URL.revokeObjectURL(oldImage.preview);
      }

      // Создаем новый preview
      const preview = URL.createObjectURL(file);

      setUploadedImages(
        uploadedImages.map((img) =>
          img.id === id ? { id, file, preview } : img
        )
      );
    };
    input.click();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return {
    uploadedImages,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleReplaceImage,
    openFileDialog,
  };
}
