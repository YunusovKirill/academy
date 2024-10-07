import { create } from 'zustand';

interface SortState {
  sortCriteria: string | number;
  setSortCriteria: (criteria: string | number) => void;
}

export const useSortStore = create<SortState>((set) => ({
  sortCriteria: 'popularity',
  setSortCriteria: (criteria) => set({ sortCriteria: criteria }),
}));