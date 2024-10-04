import { create } from 'zustand';
import { produce } from 'immer';

interface Anime {
  image_url: string | undefined;
  favorites: number;
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  genres: { mal_id: number; name: string }[];
}

export enum Rating {
  G = 'g',
  PG = 'pg',
  PG13 = 'pg13',
  R = 'R - 17+ (violence & profanity)'
}

export enum Type {
  TV = 'TV',
  Movie = 'Movie',
  OVA = 'OVA',
  Special = 'Special',
}

export enum Status {
  Finished = 'finished',
  Ongoing = 'ongoing',
}

interface Filters {
  genres?: number[];           // Массив жанров
  excludedGenres?: number[];    // Массив исключённых жанров
  studios?: number[];           // Массив студий
  rating?: Rating;              // Рейтинг аниме
  type?: Type;                  // Тип аниме (TV, Movie и т.д.)
  status?: Status;              // Статус аниме (Finished, Ongoing)
  startDate?: string;           // Начало периода
  endDate?: string;             // Конец периода
}

interface AnimeState {
  animeList: Anime[];
  animeDetail?: Anime | null;
  filters: Filters;
  fetchAnime: () => void;
  fetchAnimeDetail: (id: number) => void;
  setFilters: (filters: Filters) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  animeList: [],
  animeDetail: null,
  filters: {},
  
  fetchAnime: async () => {
    const response = await fetch('https://api.jikan.moe/v4/anime');
    const data = await response.json();
    set(produce((state: AnimeState) => {
      state.animeList = data.data;
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
    set(produce((state: AnimeState) => {
      state.filters = { ...state.filters, ...newFilters };
    })),
}));