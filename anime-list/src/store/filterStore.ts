import { create } from 'zustand';
import { Rating, Status, Type } from '../types/types';

interface FilterStore {
  selectedGenres: number[];
  excludedGenres: number[];
  rating: Rating | string | undefined;
  type: Status | string | undefined;
  status: Type| string | undefined;
  setSelectedGenres: (genres: number[]) => void;
  setExcludedGenres: (genres: number[]) => void;
  setRating: (rating: string) => void;
  setType: (type: string) => void;
  setStatus: (status: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedGenres: [],
  excludedGenres: [],
  rating: 'Рейтинг',
  type: 'Тип аниме',
  status: 'Статус',
  setSelectedGenres: (genres) => set({ selectedGenres: genres }),
  setExcludedGenres: (genres) => set({ excludedGenres: genres }),
  setRating: (rating: string) => set({ rating }),
  setType: (type: string) => set({ type }),
  setStatus: (status: string) => set({ status }),
}));