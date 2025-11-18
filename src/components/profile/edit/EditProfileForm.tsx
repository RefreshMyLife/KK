"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import AvatarUpload from "./AvatarUpload";
import { useProfileFormValidation } from "@/hooks/useProfileFormValidation";

interface EditProfileFormProps {
  initialData?: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
    avatarUrl?: string;
  };
}

export default function EditProfileForm({ initialData }: EditProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Используем хук для валидации формы
  const {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleBlur,
    validateForm,
    setErrors,
    updateFormData,
  } = useProfileFormValidation({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    phone: initialData?.phone || "",
    country: initialData?.country || "",
    city: initialData?.city || "",
    avatarUrl: initialData?.avatarUrl || "/img/profile/avatar-placeholder.png",
  });

  // Загрузка данных профиля при монтировании
  useEffect(() => {
    const fetchProfile = async () => {
      if (initialData) return; // Если данные уже переданы, не загружаем

      setIsLoading(true);
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();

        if (data.success && data.data) {
          updateFormData({
            firstName: data.data.firstName || "",
            lastName: data.data.lastName || "",
            phone: data.data.phone || "",
            country: data.data.country || "",
            city: data.data.city || "",
            avatarUrl:
              data.data.avatarUrl || "/img/profile/avatar-placeholder.png",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setErrors({ general: "Не удалось загрузить данные профиля" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [initialData, setErrors, updateFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    handleBlur(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидируем всю форму перед отправкой
    if (!validateForm()) {
      console.log("Форма содержит ошибки");
      return;
    }

    setIsSaving(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message || "Профиль успешно обновлен");

        // Перенаправляем на страницу профиля через 1.5 секунды
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      } else {
        setErrors({ general: data.error || "Не удалось обновить профиль" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ general: "Произошла ошибка при обновлении профиля" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (avatarUrl: string) => {
    updateFormData({ avatarUrl });
  };

  // Показываем индикатор загрузки при первоначальной загрузке данных
  if (isLoading) {
    return (
      <div className="w-full max-w-[705px] mx-auto mb-40 flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[705px] mx-auto mb-40"
    >
      {/* Загрузка аватара */}
      <AvatarUpload
        currentAvatar={formData.avatarUrl}
        onAvatarChange={handleAvatarChange}
      />

      {/* Сообщение об успехе */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {/* Общая ошибка */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded">
          {errors.general}
        </div>
      )}

      <FormInput
        id="firstName"
        name="firstName"
        label="Имя"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        required
        error={touched.firstName ? errors.firstName : undefined}
        minLength={2}
      />

      <FormInput
        id="lastName"
        name="lastName"
        label="Фамилия"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        placeholder="Введите фамилию"
        error={touched.lastName ? errors.lastName : undefined}
        minLength={2}
      />

      <FormInput
        id="phone"
        name="phone"
        label="Телефон"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        placeholder="+7 (999) 123-45-67"
        required
        error={touched.phone ? errors.phone : undefined}
      />

      <FormInput
        id="country"
        name="country"
        label="Страна"
        type="text"
        value={formData.country}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        placeholder="Россия"
        required
        error={touched.country ? errors.country : undefined}
        minLength={2}
      />

      <FormInput
        id="city"
        name="city"
        label="Город"
        type="text"
        value={formData.city}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        placeholder="Москва"
        required
        error={touched.city ? errors.city : undefined}
        minLength={2}
      />

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isSaving}
        className={`w-full h-[60px] text-white text-base leading-[1.2] font-medium transition-colors mt-4 flex items-center justify-center gap-2 ${
          isSaving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {isSaving ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Сохранение...
          </>
        ) : (
          "Обновить"
        )}
      </button>
    </form>
  );
}
