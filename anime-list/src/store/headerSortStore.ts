import { create } from 'zustand';

type SortOption = 'weight' | 'date';

interface HeaderSortStore {
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
}

export const useHeaderSortStore = create<HeaderSortStore>((set) => ({
  sortBy: 'weight',
  setSortBy: (sortBy) => set({ sortBy }),
}));