import { create } from 'zustand';

interface AnimeState {
  animeList: any[];
  fetchAnime: () => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  animeList: [],
  fetchAnime: async () => {
    const response = await fetch('https://api.jikan.moe/v4/anime');
    const data = await response.json();
    set({ animeList: data.data });
  },
}));