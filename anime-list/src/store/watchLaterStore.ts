import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

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
}

export const useWatchLaterStore = create(
  persist<WatchLaterState>(
    (set) => ({
      animeList: [],
      addAnime: (anime) =>
        set(produce((state: WatchLaterState) => {
          state.animeList.push({ ...anime, addedAt: Date.now() });
        })),
      removeAnime: (id) =>
        set(produce((state: WatchLaterState) => {
          state.animeList = state.animeList.filter((anime) => anime.id !== id);
        })),
    }),
    { name: 'watch-later-storage' }
  )
);