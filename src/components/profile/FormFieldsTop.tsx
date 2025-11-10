import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormData, FormErrors } from "@/hooks/useFormValidation";

interface FormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  onFieldChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
}

export default function FormFieldsTop({
  formData,
  errors,
  touched,
  onFieldChange,
  onBlur,
}: FormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Название */}
      <div className="flex flex-col gap-2">
        <label className="text-sm leading-[1.2em]">
          Название <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Звёздная ночь"
          value={formData.title}
          onChange={(e) => onFieldChange("title", e.target.value)}
          onBlur={() => onBlur("title")}
          className={`px-5 py-3.5 h-auto border-[#DEDEDE] ${
            touched.title && errors.title ? "border-red-500" : ""
          }`}
        />
        {touched.title && errors.title && (
          <span className="text-red-500 text-sm">{errors.title}</span>
        )}
      </div>

      {/* Художник */}
      <div className="flex flex-col gap-2">
        <label className="text-sm leading-[1.2em]">
          Художник <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.artist}
          onChange={(e) => onFieldChange("artist", e.target.value)}
          onBlur={() => onBlur("artist")}
          className={`px-5 py-3.5 h-auto border-[#DEDEDE] ${
            formData.artist ? "text-black" : "text-[#A4A4A4]"
          } ${touched.artist && errors.artist ? "border-red-500" : ""}`}
        >
          <option value="">Выберите художника</option>
          <option value="artist1">Художник 1</option>
          <option value="artist2">Художник 2</option>
          <option value="artist3">Художник 3</option>
        </Select>
        {touched.artist && errors.artist && (
          <span className="text-red-500 text-sm">{errors.artist}</span>
        )}
      </div>

      {/* Жанр */}
      <div className="flex flex-col gap-2">
        <label className="text-sm leading-[1.2em]">
          Жанр <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.genre}
          onChange={(e) => onFieldChange("genre", e.target.value)}
          onBlur={() => onBlur("genre")}
          className={`px-5 py-3.5 h-auto border-[#DEDEDE] ${
            formData.genre ? "text-black" : "text-[#A4A4A4]"
          } ${touched.genre && errors.genre ? "border-red-500" : ""}`}
        >
          <option value="">Выберите жанр</option>
          <option value="genre1">Жанр 1</option>
          <option value="genre2">Жанр 2</option>
          <option value="genre3">Жанр 3</option>
        </Select>
        {touched.genre && errors.genre && (
          <span className="text-red-500 text-sm">{errors.genre}</span>
        )}
      </div>

      {/* Высота, Ширина, Цена */}
    </div>
  );
}
