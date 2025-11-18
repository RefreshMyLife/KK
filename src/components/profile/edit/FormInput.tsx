"use client";

import { useState } from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  pattern,
  minLength,
  maxLength,
}: FormInputProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    // Вызываем переданный обработчик, если он есть
    if (onBlur) {
      onBlur(e);
    }
  };

  // Показываем ошибку, если поле было затронуто и есть ошибка
  // Или если ошибка передана снаружи (значит валидация уже произошла)
  const showError = (touched || error) && error;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-base leading-[1.2] mb-4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        className={`w-full pl-5 py-3 border-1 ${
          showError ? "border-red-500" : "border-[#E0E0E0]"
        } bg-transparent text-base leading-[1.2] outline-none focus:border-black transition-colors ${
          placeholder ? "placeholder:text-gray-400" : ""
        }`}
        required={required}
        aria-invalid={showError ? "true" : "false"}
        aria-describedby={showError ? `${id}-error` : undefined}
      />
      {showError && (
        <p
          id={`${id}-error`}
          className="text-red-500 text-sm mt-2"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
