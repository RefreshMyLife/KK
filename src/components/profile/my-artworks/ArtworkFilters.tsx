"use client";

import { Search } from "lucide-react";

export type ArtworkStatus = "all" | "published" | "sold";

interface ArtworkFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeStatus: ArtworkStatus;
  onStatusChange: (status: ArtworkStatus) => void;
}

export default function ArtworkFilters({
  searchQuery,
  onSearchChange,
  activeStatus,
  onStatusChange,
}: ArtworkFiltersProps) {
  const filters: { label: string; value: ArtworkStatus }[] = [
    { label: "Все", value: "all" },
    { label: "Опубликовано", value: "published" },
    { label: "Продано", value: "sold" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mb-5">
      {/* Поиск */}
      <div className="relative w-full md:w-[370px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск по вашим картинам"
          className="w-full h-[46px] px-5 pr-12 bg-[#F5F5F5] text-base placeholder:text-[#A4A4A4] focus:outline-none focus:ring-2 focus:ring-black/10"
        />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-[30px] h-[30px] text-black/40 pointer-events-none" />
      </div>

      {/* Фильтры статуса */}
      <div className="flex items-center justify-center gap-1 p-1 border border-[#F5F5F5] bg-white rounded w-full md:w-auto">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onStatusChange(filter.value)}
            className={`flex-1 md:flex-none px-4 md:px-[30px] py-2.5 text-sm md:text-base transition-colors ${
              activeStatus === filter.value
                ? "bg-[#F5F5F5] text-black"
                : "bg-transparent text-black hover:bg-[#F5F5F5]/50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
