"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Artist } from "@/app/types/artist";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface ArtistsListProps {
  artists: Artist[];
}

const ALPHABET = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ж",
  "З",
  "И",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Э",
  "Ю",
  "Я",
];

export default function ArtistsList({ artists }: ArtistsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Получение списка всех доступных букв (без учета фильтров)
  const allAvailableLetters = useMemo(() => {
    const letters = new Set<string>();
    artists.forEach((artist) => {
      letters.add(artist.name.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, [artists]);

  // Фильтрация и группировка художников
  const filteredAndGroupedArtists = useMemo(() => {
    let filtered = artists;

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      filtered = filtered.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтрация по выбранной букве
    if (selectedLetter) {
      filtered = filtered.filter(
        (artist) => artist.name.charAt(0).toUpperCase() === selectedLetter
      );
    }

    // Группировка по буквам
    const grouped: { [key: string]: Artist[] } = {};
    filtered.forEach((artist) => {
      const firstLetter = artist.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(artist);
    });

    return grouped;
  }, [artists, searchQuery, selectedLetter]);

  // Получение списка букв с художниками (после применения фильтров)
  const availableLetters = useMemo(() => {
    return Object.keys(filteredAndGroupedArtists).sort();
  }, [filteredAndGroupedArtists]);

  return (
    <div className="container m-auto pt-32 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Художники" }]}
      />
      <div className="grid  gap-5 md:gap-0 grid-cols-[1fr] sm:grid-cols-[1fr_2fr] md:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
        {/* Заголовок */}
        <h1 className=" hidden sm:block text-[32px] font-bold mb-8 tracking-[0.05em] text-gray-900">
          ХУДОЖНИКИ
        </h1>

        {/* Поиск и Алфавитный фильтр  */}
        <div className="mb-10 pb-8">
          <div className="flex flex-col items-center gap-8 mb-5">
            {/* Поиск */}
            <div className="relative flex-shrink-0" style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Андеграунд, море, лес..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] px-4 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-[14px] text-gray-700 placeholder:text-gray-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-gray-400" />
            </div>

            {/* Алфавитный фильтр */}
            <div className="flex-1 max-w-[608px]">
              <div className="flex flex-wrap gap-2 justify-center">
                {ALPHABET.map((letter) => {
                  const isAvailable = allAvailableLetters.includes(letter);
                  const isSelected = selectedLetter === letter;

                  return (
                    <button
                      key={letter}
                      onClick={() => {
                        if (isAvailable) {
                          // Сбрасываем поиск при выборе буквы
                          if (!isSelected) {
                            setSearchQuery("");
                          }
                          setSelectedLetter(isSelected ? null : letter);
                        }
                      }}
                      className={`min-w-[32px] h-[32px] px-2 text-[13px] font-normal border rounded transition-colors ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : isAvailable
                          ? "border-gray-300 hover:border-gray-500 text-gray-900 bg-white cursor-pointer"
                          : "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                      }`}
                      disabled={!isAvailable}
                      title={
                        isSelected
                          ? "Нажмите, чтобы сбросить фильтр"
                          : isAvailable
                          ? `Фильтровать по букве ${letter}`
                          : "Нет художников на эту букву"
                      }
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Текст под фильтром */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[12px] text-center text-custom-gray-dark leading-tight">
              Фильтрация по первой букве в фамилии
            </p>
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="text-[12px] text-gray-600 hover:text-gray-900 underline transition-colors"
              >
                Сбросить фильтр
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Список художников */}
      {availableLetters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
          {availableLetters.map((letter) => (
            <div key={letter}>
              {/* Буква заголовок */}
              <h2 className="text-[28px] font-bold mb-5 text-gray-900 border-b pb-2">
                {letter}
              </h2>

              {/* Список художников под этой буквой */}
              <ul className="space-y-3">
                {filteredAndGroupedArtists[letter].map((artist) => (
                  <li key={artist.id}>
                    <Link
                      href={`/artists/${artist.slug}`}
                      className="block group"
                    >
                      <div className="text-[14px] font-normal text-gray-900 group-hover:underline leading-snug">
                        {artist.name}
                      </div>
                      <div className="text-[12px] text-gray-500 mt-0.5">
                        {artist.birthYear} — {artist.deathYear}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-0 pb-10 sm:py-20">
          <h2 className="text-[32px] font-gibb text-gray-900 mb-2 text-center leading-none">
            НИЧЕГО
            <br />
            НЕ НАЙДЕНО
          </h2>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedLetter(null);
            }}
            className="mt-6 px-6 py-2.5 border border-gray-900 text-gray-900 text-[14px] font-normal hover:bg-gray-900 hover:text-white transition-colors"
          >
            Сбросить фильтры и поиск
          </button>
        </div>
      )}
    </div>
  );
}
