"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CatalogFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryIds: string[]) => void;
  onClearAll: () => void;
}

// Моковые теги с количеством
const tags = [
  { id: "avangardustika", name: "Авангардистика", count: 643 },
  { id: "balet", name: "Балет", count: 43 },
  { id: "vov", name: "ВОВ", count: 91 },
  { id: "vozhd", name: "Вождь", count: 94 },
  { id: "grafika", name: "Графика", count: 423 },
  { id: "deti-kartinkah", name: "Дети на картинах", count: 534 },
  { id: "zhivotnie", name: "Животные", count: 234 },
  { id: "zhenschini", name: "Женщины", count: 876 },
  { id: "zarubezhie", name: "Зарубежье", count: 156 },
  { id: "konstruktivizm", name: "Конструктивизм", count: 234 },
];

const sizeRanges = [
  { id: "small", label: "Маленькие до 40см" },
  { id: "medium", label: "Средние от 40см" },
  { id: "large", label: "Большие от 100см" },
];

export default function CatalogFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  onClearAll,
}: CatalogFiltersProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  // Size state
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Price range state
  const [minPrice, setMinPrice] = useState(2842954);
  const [maxPrice, setMaxPrice] = useState(48935823);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    2842954, 48935823,
  ]);

  // Tags state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelected);
  };

  const handleSizeToggle = (sizeId: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleMinPriceChange = (value: number) => {
    const newMin = Math.min(value, priceRange[1]);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxPriceChange = (value: number) => {
    const newMax = Math.max(value, priceRange[0]);
    setPriceRange([priceRange[0], newMax]);
  };

  const handleClearAll = () => {
    setSelectedSizes([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedTags([]);
    onClearAll();
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedTags.length > 0 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU").replace(/\s/g, " ");
  };

  return (
    <div className="w-full">
      {/* Заголовок */}
      <h1 className="text-[32px] md:text-[36px] font-gibb mb-6 tracking-[0.05em] text-black">
        КАТАЛОГ
      </h1>
      {/* Кнопка сброса фильтров */}
      {hasActiveFilters && (
        <button
          onClick={handleClearAll}
          className="mb-6 text-[14px] text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          × Сбросить все фильтры
        </button>
      )}

      {/* Категории */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-[16px] font-medium text-gray-900">Категории</h3>
          {isCategoriesOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
        {isCategoriesOpen && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-start cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="mt-0.5 mr-3 w-4 h-4 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-gray-700 group-hover:text-gray-900 leading-tight">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Размер */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-[16px] font-medium text-gray-900">Размер</h3>
          {isSizeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
        {isSizeOpen && (
          <div className="space-y-2">
            {sizeRanges.map((size) => (
              <label
                key={size.id}
                className="flex items-start cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size.id)}
                  onChange={() => handleSizeToggle(size.id)}
                  className="mt-0.5 mr-3 w-4 h-4 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-gray-700 group-hover:text-gray-900">
                  {size.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Цена */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-[16px] font-medium text-gray-900">Цена</h3>
          {isPriceOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
        {isPriceOpen && (
          <div className="space-y-4">
            {/* Отображение выбранного диапазона */}
            <div className="flex items-center justify-between text-[15px] text-gray-900">
              <span>{formatPrice(priceRange[0])}</span>
              <span>—</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>

            {/* Двойной слайдер */}
            <div className="relative pt-2 pb-2">
              {/* Трек */}
              <div className="relative h-1 bg-gray-200 rounded">
                {/* Активная часть трека */}
                <div
                  className="absolute h-1 bg-gray-900 rounded"
                  style={{
                    left: `${
                      ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100
                    }%`,
                    right: `${
                      100 -
                      ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Минимальный слайдер */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />

              {/* Максимальный слайдер */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />
            </div>
          </div>
        )}
      </div>

      {/* Теги */}
      <div className="mb-6">
        <button
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-[16px] font-medium text-gray-900">Теги</h3>
          {isTagsOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
        {isTagsOpen && (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
              >
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                    className="mr-3 w-4 h-4 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-[14px] text-gray-700 group-hover:text-gray-900">
                    {tag.name}
                  </span>
                </div>
                <span className="text-[13px] text-gray-400 ml-2">
                  {tag.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
