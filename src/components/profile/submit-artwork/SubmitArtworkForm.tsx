"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/useFormValidation";
import ImageUploadSection from "./ImageUploadSection";
import FormFieldsTop from "./FormFieldsTop";
import { FormFieldsBottom } from "./FormFieldsBottom";

export default function SubmitArtworkForm() {
  const [hasImages, setHasImages] = useState(false);

  const {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleBlur,
    validateForm,
    markAllTouched,
    isFormValid,
    setErrors,
  } = useFormValidation({
    title: "",
    artist: "",
    genre: "",
    height: "",
    width: "",
    price: "",
    description: "",
  });

  const handleImagesChange = (hasImagesValue: boolean) => {
    setHasImages(hasImagesValue);
    // Очищаем ошибку изображений при успешной загрузке
    if (hasImagesValue) {
      setErrors({ ...errors, images: undefined });
    } else {
      setErrors({
        ...errors,
        images: "Необходимо загрузить минимум одну фотографию",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Помечаем все поля как затронутые
    markAllTouched();

    if (validateForm(hasImages)) {
      console.log("Отправка формы:", formData);
      // TODO: Implement form submission
      alert("Форма успешно отправлена!");
    } else {
      console.log("Форма содержит ошибки");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-[720px] md:w-[720px]"
    >
      {/* Поля формы Top */}
      <div className="flex flex-col gap-4">
        <FormFieldsTop
          formData={formData}
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
          onBlur={handleBlur}
        />

        {/* Загрузка изображений */}
        <ImageUploadSection
          onImagesChange={handleImagesChange}
          error={errors.images}
        />
        {/* Поля формы Bottom */}
        <FormFieldsBottom
          formData={formData}
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Кнопка отправки */}
      <Button
        type="submit"
        disabled={!isFormValid(hasImages)}
        className={`w-full py-5 px-6 text-base h-auto ${
          isFormValid(hasImages)
            ? "bg-black text-white hover:bg-black/90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Отправить на модерацию
      </Button>
    </form>
  );
}
