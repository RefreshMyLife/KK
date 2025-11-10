import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  price: number;
  details: string;
  size: string;
  country: string;
  year: string;
  imageUrl?: string;
}

interface FavoritesStore {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: FavoriteItem) => boolean;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
  getTotalItems: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      toggleItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          // Удаляем из избранного
          get().removeItem(item.id);
          return false;
        } else {
          // Добавляем в избранное
          get().addItem(item);
          return true;
        }
      },

      clearFavorites: () => {
        set({ items: [] });
      },

      isFavorite: (id) => {
        return get().items.some((item) => item.id === id);
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
