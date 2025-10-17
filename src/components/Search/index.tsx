"use client";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { User, FileText, X } from "lucide-react";

const artists = [
  { id: 1, name: "Зоммер Рихард-Карл Карлович", type: "artist" },
  { id: 2, name: "Зоммер Рихард-Карл Карлович", type: "artist" },
  { id: 3, name: "Зоммер Рихард-Карл Карлович", type: "artist" },
];

const artworks = [
  { id: 1, name: "Натюрморт с арбузом и виноградом", type: "artwork" },
  { id: 2, name: "Композиция с арбузом", type: "artwork" },
];

export default function SearchCommand() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");

  const filteredArtists = artists.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredArtworks = artworks.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const hasResults = filteredArtists.length > 0 || filteredArtworks.length > 0;
  const showResults = inputValue.length > 0;

  const handleSelect = (name: React.SetStateAction<string>) => {
    setSelected(name);
    setInputValue(name);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <span className="font-semibold text-blue-600">
          {text.slice(index, index + query.length)}
        </span>
        {text.slice(index + query.length)}
      </>
    );
  };

  return (
    <div className="relative w-full max-w-[370px] rounded-sm  bg-custom-gray-light">
      <Command className="rounded-sm  overflow-visible">
        <CommandInput
          placeholder="Андерграунд, море, лес..."
          value={inputValue}
          onValueChange={setInputValue}
          className="whitespace-nowrap"
        />
      </Command>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="bg-custom-gray-light rounded-sm ">
            <Command className="rounded-sm  overflow-visible">
              {showResults && (
                <CommandList>
                  {!hasResults && (
                    <CommandEmpty>Ничего не найдено.</CommandEmpty>
                  )}

                  {filteredArtists.length > 0 && (
                    <>
                      <CommandGroup heading="Художники">
                        {filteredArtists.map((artist) => (
                          <CommandItem
                            key={artist.id}
                            onSelect={() => handleSelect(artist.name)}
                          >
                            <User className="mr-2 h-4 w-4 text-gray-500" />
                            <span className="truncate">
                              {highlightMatch(artist.name, inputValue)}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {filteredArtworks.length > 0 && <CommandSeparator />}
                    </>
                  )}

                  {filteredArtworks.length > 0 && (
                    <CommandGroup heading="Работы">
                      {filteredArtworks.map((artwork) => (
                        <CommandItem
                          key={artwork.id}
                          onSelect={() => handleSelect(artwork.name)}
                        >
                          <FileText className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="truncate">
                            {highlightMatch(artwork.name, inputValue)}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              )}
            </Command>
          </div>
        </div>
      )}
    </div>
  );
}
