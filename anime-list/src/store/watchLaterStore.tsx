import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchLaterAnime {
  id: number;
  title: string;
  image: string;
  weight: number;
  addedAt: number;
}

interface WatchLaterState {
  animeList: WatchLaterAnime[];
  addAnime: (anime: WatchLaterAnime) => void;
  removeAnime: (id: number) => void;
  sortAnime: (sortBy: 'weight' | 'date') => void;
}

export const useWatchLaterStore = create(
  persist<WatchLaterState>(
    (set) => ({
      animeList: [],
      addAnime: (anime) =>
        set((state) => ({
          animeList: [...state.animeList, { ...anime, addedAt: Date.now() }],
        })),
      removeAnime: (id) =>
        set((state) => ({
          animeList: state.animeList.filter((anime) => anime.id !== id),
        })),
      sortAnime: (sortBy) =>
        set((state) => {
          const sortedList = [...state.animeList].sort((a, b) =>
            sortBy === 'weight' ? b.weight - a.weight : b.addedAt - a.addedAt
          );
          return { animeList: sortedList };
        }),
    }),
    { name: 'watch-later-storage' }
  )
);