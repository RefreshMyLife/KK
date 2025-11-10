"use client";

import { useState } from "react";

interface FavoritesHeaderProps {
  onFilterChange?: (filter: "items" | "auctions") => void;
}

export const FavoritesHeader = ({ onFilterChange }: FavoritesHeaderProps) => {
  const [activeFilter, setActiveFilter] = useState<"items" | "auctions">(
    "items"
  );

  const handleFilterChange = (filter: "items" | "auctions") => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <h1 className="font-gibb text-4xl uppercase">Избранное</h1>

      <div className="flex items-center gap-1 p-1 bg-custom-gray-light rounded-lg border-[1.5px] border-custom-gray-light">
        <button
          onClick={() => handleFilterChange("items")}
          className={`px-[30px] py-[10px] rounded-md text-base transition-colors ${
            activeFilter === "items"
              ? "bg-custom-gray-light text-black"
              : "bg-transparent text-black hover:bg-custom-gray-light/50"
          }`}
        >
          Предметы
        </button>
        <button
          onClick={() => handleFilterChange("auctions")}
          className={`px-[30px] py-[10px] rounded-md text-base transition-colors ${
            activeFilter === "auctions"
              ? "bg-custom-gray-light text-black"
              : "bg-transparent text-black hover:bg-custom-gray-light/50"
          }`}
        >
          Аукционы
        </button>
      </div>
    </div>
  );
};
