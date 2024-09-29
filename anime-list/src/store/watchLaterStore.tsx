import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Anime } from '../types/types';

interface WatchLaterStore {
  watchLaterList: { anime: Anime, rating: number, addedAt: Date }[];
  addToWatchLater: (anime: Anime, rating?: number) => void;
  removeFromWatchLater: (mal_id: number) => void;
  setRating: (mal_id: number, rating: number) => void;
  sortedWatchLaterList: (sortBy: string) => { anime: Anime, rating: number, addedAt: Date }[];
}

export const useWatchLaterStore = create(persist<WatchLaterStore>((set, get) => ({
  watchLaterList: [],
  
  // Добавление в список
  addToWatchLater: (anime, rating = 1) => {
    set((state) => ({
      watchLaterList: [...state.watchLaterList, { anime, rating, addedAt: new Date() }]
    }));
  },

  // Удаление из списка
  removeFromWatchLater: (mal_id) => {
    set((state) => ({
      watchLaterList: state.watchLaterList.filter(item => item.anime.mal_id !== mal_id)
    }));
  },

  // Установка рейтинга
  setRating: (mal_id, rating) => {
    set((state) => ({
      watchLaterList: state.watchLaterList.map(item =>
        item.anime.mal_id === mal_id ? { ...item, rating } : item
      )
    }));
  },

  // Сортировка по дате добавления и весу
  sortedWatchLaterList: (sortBy) => {
    const list = [...get().watchLaterList];
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating || new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    } else if (sortBy === 'date') {
      return list.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }
    return list;
  },
}), {
  name: 'watch-later-storage', // ключ для LocalStorage
}));