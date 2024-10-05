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
  G = 'G',
  PG = 'PG - Children',
  PG13 = 'PG-13 - Teens 13 or older',
  R = 'R - 17+ (violence & profanity)',
  RPlus = 'R+ - Mild Nudity'
}

export enum Type {
  TV = 'TV',
  Movie = 'Movie',
  OVA = 'OVA',
  Special = 'Special',
}

export enum Status {
  Finished = 'Finished Airing',
  Ongoing = 'Currently Airing',
}

interface Studio {
  mal_id: number;
  name: string;
}

interface Filters {
  genres?: number[];
  excludedGenres?: number[];
  studios?: number[];
  rating?: Rating;
  type?: Type;
  status?: Status;
  startDate?: string;
  endDate?: string;
}

interface AnimeState {
  animeList: Anime[];
  animeDetail?: Anime | null;
  filters: Filters;
  genres?: { mal_id: number; name: string }[];
  studios?: Studio[];
  fetchAnime: () => void;
  fetchAnimeDetail: (id: number) => void;
  fetchGenres: () => void;
  // fetchStudios: () => void;
  setFilters: (filters: Filters) => void;
}

let lastRequestTime = 0;

const fetchWithDelay = async (url: string, delay: number = 30000) => {
  const currentTime = Date.now();
  const timeSinceLastRequest = currentTime - lastRequestTime;

  if (timeSinceLastRequest < delay) {
    await new Promise((resolve) => setTimeout(resolve, delay - timeSinceLastRequest));
  }

  lastRequestTime = Date.now();
  return fetch(url);
};

export const useAnimeStore = create<AnimeState>((set) => ({
  animeList: [],
  animeDetail: null,
  filters: {},
  genres: [],
  studios: [],

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

  fetchGenres: async () => {
    try {
      const response = await fetchWithDelay('https://api.jikan.moe/v4/genres/anime', 5000); // 30 секунд задержки
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      set(produce((state: AnimeState) => {
        state.genres = data.data;
      }));
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  },

  // fetchStudios: async () => {
  //   try {
  //     const response = await fetchWithDelay('https://api.jikan.moe/v4/producers', 60000); // 30 секунд задержки
  //     if (!response.ok) throw new Error(`Error: ${response.status}`);
  //     const data = await response.json();
  //     set(produce((state: AnimeState) => {
  //       state.studios = data.data;
  //     }));
  //   } catch (error) {
  //     console.error('Failed to fetch studios:', error);
  //   }
  // },

  setFilters: (newFilters: Partial<Filters>) =>
    set(produce((state: AnimeState) => {
      state.filters = { ...state.filters, ...newFilters };
    })),
}));