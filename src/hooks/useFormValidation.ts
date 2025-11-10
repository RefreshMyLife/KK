import { useState } from "react";

export interface FormData {
  title: string;
  artist: string;
  genre: string;
  height: string;
  width: string;
  price: string;
  description: string;
}

export interface FormErrors {
  title?: string;
  artist?: string;
  genre?: string;
  height?: string;
  width?: string;
  price?: string;
  description?: string;
  images?: string;
}

export function useFormValidation(initialData: FormData) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Название обязательно для заполнения";
        if (value.trim().length < 2)
          return "Название должно содержать минимум 2 символа";
        break;
      case "artist":
        if (!value) return "Выберите художника";
        break;
      case "genre":
        if (!value) return "Выберите жанр";
        break;
      case "height":
        if (!value.trim()) return "Высота обязательна для заполнения";
        if (!/^\d+(\.\d+)?$/.test(value))
          return "Высота должна быть числом (например, 100.2)";
        if (parseFloat(value) <= 0) return "Высота должна быть больше 0";
        break;
      case "width":
        if (!value.trim()) return "Ширина обязательна для заполнения";
        if (!/^\d+(\.\d+)?$/.test(value))
          return "Ширина должна быть числом (например, 45.5)";
        if (parseFloat(value) <= 0) return "Ширина должна быть больше 0";
        break;
      case "price":
        if (!value.trim()) return "Цена обязательна для заполнения";
        if (!/^\d+$/.test(value)) return "Цена должна быть целым числом";
        if (parseInt(value) < 0) return "Цена не может быть отрицательной";
        break;
      case "description":
        if (!value.trim()) return "Описание обязательно для заполнения";
        if (value.trim().length < 10)
          return "Описание должно содержать минимум 10 символов";
        break;
    }
  };

  const validateForm = (hasImages: boolean): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (!hasImages) {
      newErrors.images = "Необходимо загрузить минимум одну фотографию";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (name: string, value: string) => {
    // Для числовых полей разрешаем только числа и точку
    if (name === "height" || name === "width") {
      if (value && !/^\d*\.?\d*$/.test(value)) {
        return;
      }
    }

    // Для цены разрешаем только целые числа
    if (name === "price") {
      if (value && !/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });

    // Валидация поля при изменении (если поле уже было затронуто)
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors({ ...errors, [name]: error });
  };

  const markAllTouched = () => {
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
  };

  const isFormValid = (hasImages: boolean): boolean => {
    return (
      formData.title.trim() &&
      formData.artist &&
      formData.genre &&
      formData.height.trim() &&
      formData.width.trim() &&
      formData.price.trim() &&
      formData.description.trim() &&
      hasImages &&
      Object.keys(errors).every((key) => !errors[key as keyof FormErrors])
    );
  };

  return {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleBlur,
    validateForm,
    markAllTouched,
    isFormValid,
    setErrors,
  };
}
