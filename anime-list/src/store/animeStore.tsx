import create from 'zustand';
import { fetchAnimeList, fetchAnimeDetail } from '../api/animeApi';
import { Anime, AnimeListResponse } from '../types/types';

interface AnimeStore {
  animeList: Anime[];
  currentPage: number;
  filters: any; // сюда можно добавить типизацию для фильтров
  sortOptions: string;
  fetchAnime: () => Promise<void>;
  setFilters: (filters: any) => void;
  setSortOptions: (sort: string) => void;
  setPage: (page: number) => void;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  animeList: [],
  currentPage: 1,
  filters: {},
  sortOptions: '',
  fetchAnime: async () => {
    const { currentPage, filters, sortOptions } = get();
    const params = {
      page: currentPage,
      ...filters,
      order_by: sortOptions,
    };
    const response: AnimeListResponse = await fetchAnimeList(params);
    set({ animeList: response.data });
  },
  setFilters: (filters) => set({ filters }),
  setSortOptions: (sort) => set({ sortOptions: sort }),
  setPage: (page) => set({ currentPage: page }),
}));