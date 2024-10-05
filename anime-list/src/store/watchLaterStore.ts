import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';
import { Genre } from '../types/types';
import { Studio } from './animeStore';

interface WatchLaterAnime {
  mal_id: number
  title: string;
  image: string;
  synopsis: string;
  score: number;
  rating: string;
  favorites: number;
  episodes?: number;
  aired: {
    from?: string;
    to?: string;
  };
  type: string;
  status: string;
  genres: Genre[];
  studios: Studio[];
  weight: number; // Ожидаемый рейтинг
  dateAdded: number; // Дата добавления
}

interface WatchLaterStore {
  animeList: WatchLaterAnime[];
  addAnime: (anime: WatchLaterAnime) => void;
  removeAnime: (mal_id: number) => void;
  setWeight: (mal_id: number, weight: number) => void; // Метод для изменения рейтинга ожидания
  sortedAnimeList: (sortBy: 'weight' | 'date') => WatchLaterAnime[];
}

const customLocalStorage: PersistStorage<WatchLaterStore> = {
  getItem: (name: string): StorageValue<WatchLaterStore> | null => {
    const storedValue = localStorage.getItem(name);
    if (storedValue) {
      try {
        return { state: JSON.parse(storedValue), version: 0 };
      } catch (e) {
        console.error('Ошибка при парсинге данных из localStorage', e);
        return null;
      }
    }
    return null;
  },
  setItem: (name: string, value: StorageValue<WatchLaterStore>): void => {
    localStorage.setItem(name, JSON.stringify(value.state));
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  },
};

export const useWatchLaterStore = create<WatchLaterStore>()(
  persist(
    (set, get) => ({
      animeList: [],

      addAnime: (anime: WatchLaterAnime) => set((state: WatchLaterStore) => ({
        animeList: [
          ...state.animeList,
          { ...anime, mal_id: Number(anime.mal_id), dateAdded: Date.now() }
        ]
      })),

      removeAnime: (mal_id: number) => set((state: WatchLaterStore) => ({
        animeList: state.animeList.filter(anime => anime.mal_id !== mal_id)
      })),

      setWeight: (mal_id: number, weight: number) => set((state: WatchLaterStore) => ({
        animeList: state.animeList.map(anime =>
          anime.mal_id === mal_id ? { ...anime, weight } : anime
        )
      })),

      sortedAnimeList: (sortBy: 'weight' | 'date'): WatchLaterAnime[] => {
        const animeList = get().animeList;
        return [...animeList].sort((a, b) => {
          // Сначала сортируем по весу (рейтинг ожидания)
          if (a.weight !== b.weight) {
            return b.weight - a.weight;
          }
          // Если веса равны, сортируем по дате добавления
          if (sortBy === 'date') {
            return b.dateAdded - a.dateAdded;
          }
          return 0;
        });
      },
    }),
    {
      name: 'watch-later-storage',
      storage: customLocalStorage, // Используем кастомное хранилище
    }
  )
);