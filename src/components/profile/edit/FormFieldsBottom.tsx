import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormData, FormErrors } from "@/hooks/useFormValidation";

interface FormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  onFieldChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
}

export const FormFieldsBottom = ({
  formData,
  errors,
  touched,
  onFieldChange,
  onBlur,
}: FormFieldsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-[154px]">
          <label className="text-sm leading-[1.2em]">
            Высота (см) <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="100.2"
            value={formData.height}
            onChange={(e) => onFieldChange("height", e.target.value)}
            onBlur={() => onBlur("height")}
            className={`px-5 py-3.5 h-auto border-[#DEDEDE] ${
              touched.height && errors.height ? "border-red-500" : ""
            }`}
          />
          {touched.height && errors.height && (
            <span className="text-red-500 text-xs">{errors.height}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-[155px]">
          <label className="text-sm leading-[1.2em]">
            Ширина (см) <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="45.5"
            value={formData.width}
            onChange={(e) => onFieldChange("width", e.target.value)}
            onBlur={() => onBlur("width")}
            className={`px-5 py-3.5 h-auto border-[#DEDEDE] ${
              touched.width && errors.width ? "border-red-500" : ""
            }`}
          />
          {touched.width && errors.width && (
            <span className="text-red-500 text-xs">{errors.width}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <label className="text-sm leading-[1.2em]">
            Цена (₽) <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="0"
            value={formData.price}
            onChange={(e) => onFieldChange("price", e.target.value)}
            onBlur={() => onBlur("price")}
            className={`px-5 py-3.5 h-auto border-[#DEDEDE] ${
              touched.price && errors.price ? "border-red-500" : ""
            }`}
          />
          {touched.price && errors.price && (
            <span className="text-red-500 text-xs">{errors.price}</span>
          )}
        </div>
      </div>

      {/* Описание */}
      <div className="flex flex-col gap-2">
        <label className="text-sm leading-[1.2em]">
          Описание <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="История создания, интересные факты, отличительные особенности"
          value={formData.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          onBlur={() => onBlur("description")}
          className={`px-5 py-3.5 min-h-[120px] border-[#DEDEDE] ${
            touched.description && errors.description ? "border-red-500" : ""
          }`}
        />
        {touched.description && errors.description && (
          <span className="text-red-500 text-sm">{errors.description}</span>
        )}
      </div>
    </div>
  );
};
