import { create } from 'zustand';
import { produce } from 'immer';
import { Filters, Genre, Studios } from '../types/types';

interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  favorites: number;
  studios?: Studios[];
  genres?: Genre[];
  rating?: string;
  episodes?: number;
  type?: string;
  status?: string;
  aired?: {
    from?: string;
    to?: string;
  };
  themes?: { name: string }[];
  related?: { [key: string]: { name: string }[] };
  trailer?: {
    url?: string;
  };
}

interface AnimeState {
  animeList: Anime[];
  filteredAnimeList: Anime[];
  animeDetail?: Anime | null;
  filters: Filters;
  genres?: { mal_id: number; name: string }[];
  studios?: Studios[];
  fetchAnime: () => void;
  fetchAnimeDetail: (id: number) => void;
  setFilters: (filters: Filters) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  animeList: [],
  filteredAnimeList: [],
  animeDetail: null,
  filters: {},

  fetchAnime: async () => {
    const response = await fetch('https://api.jikan.moe/v4/anime');
    const data = await response.json();
    set(produce((state: AnimeState) => {
      state.animeList = data.data;
      state.filteredAnimeList = data.data;
    }));
  },

  fetchAnimeDetail: async (id: number) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await response.json();
    set(produce((state: AnimeState) => {
      state.animeDetail = data.data;
    }));
  },

  setFilters: (newFilters: Partial<Filters>) =>
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
        const filteredAnimeList = state.animeList.filter((anime) => {
        // Фильтрация по жанрам
        if (filters.genres && filters.genres.length > 0) {
          const hasGenre = anime.genres?.some((genre) =>
            filters.genres?.includes(genre.mal_id)
          );
          if (!hasGenre) return false;
        }

        // Исключение жанров
        if (filters.excludedGenres && filters.excludedGenres.length > 0) {
          const hasExcludedGenre = anime.genres?.some((genre) =>
            filters.excludedGenres?.includes(genre.mal_id)
          );
          if (hasExcludedGenre) return false;
        }

        // Фильтрация по студиям
        if (filters.studios && filters.studios.length > 0) {
          const hasStudio = anime.studios?.some((studio) =>
            filters.studios?.includes(studio.mal_id)
          );
          if (!hasStudio) return false;
        }

        // Фильтрация по рейтингу
        if (filters.rating && anime.rating !== filters.rating) return false;

        // Фильтрация по типу
        if (filters.type && anime.type !== filters.type) return false;

        // Фильтрация по статусу
        if (filters.status && anime.status !== filters.status) return false;

        // Фильтрация по дате начала
        if (filters.startDate && anime.aired?.from) {
          if (new Date(anime.aired.from) < new Date(filters.startDate)) {
            return false;
          }
        }

        // Фильтрация по дате окончания
        if (filters.endDate && anime.aired?.to) {
          if (new Date(anime.aired.to) > new Date(filters.endDate)) {
            return false;
          }
        }

        // Фильтрация по запросу поиска
        if (filters.searchQuery) {
          const title = anime.title.toLowerCase();
          const query = filters.searchQuery.toLowerCase();
          if (!title.includes(query)) return false;
        }

        return true;
      });

      return { filters, filteredAnimeList };
    }),
}));