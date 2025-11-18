import { useState } from "react";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  city: string;
  avatarUrl: string;
}

export interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  city?: string;
  general?: string;
}

export function useProfileFormValidation(initialData: ProfileFormData) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "firstName":
        if (!value.trim()) {
          return "Имя обязательно для заполнения";
        }
        if (value.trim().length < 2) {
          return "Имя должно содержать минимум 2 символа";
        }
        if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
          return "Имя может содержать только буквы, пробелы и дефисы";
        }
        break;

      case "lastName":
        if (value.trim() && value.trim().length < 2) {
          return "Фамилия должна содержать минимум 2 символа";
        }
        if (value.trim() && !/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
          return "Фамилия может содержать только буквы, пробелы и дефисы";
        }
        break;

      case "phone":
        if (!value.trim()) {
          return "Телефон обязателен для заполнения";
        }
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
          return "Телефон должен содержать минимум 10 цифр";
        }
        if (digitsOnly.length > 15) {
          return "Телефон слишком длинный";
        }
        break;

      case "country":
        if (!value.trim()) {
          return "Страна обязательна для заполнения";
        }
        if (value.trim().length < 2) {
          return "Страна должна содержать минимум 2 символа";
        }
        break;

      case "city":
        if (!value.trim()) {
          return "Город обязателен для заполнения";
        }
        if (value.trim().length < 2) {
          return "Город должен содержать минимум 2 символа";
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ProfileFormErrors = {};
    let isValid = true;

    // Проверяем все поля кроме avatarUrl
    (Object.keys(formData) as Array<keyof ProfileFormData>).forEach((key) => {
      if (key !== "avatarUrl") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key as keyof ProfileFormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    // Валидация поля при изменении (если поле уже было затронуто)
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name as keyof ProfileFormData]);
    setErrors({ ...errors, [name]: error });
  };

  const markAllTouched = () => {
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
  };

  const isFormValid = (): boolean => {
    return Boolean(
      formData.firstName.trim() &&
        formData.phone.trim() &&
        formData.country.trim() &&
        formData.city.trim() &&
        Object.keys(errors).every((key) => !errors[key as keyof ProfileFormErrors])
    );
  };

  const updateFormData = (data: Partial<ProfileFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
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
    updateFormData,
  };
}
