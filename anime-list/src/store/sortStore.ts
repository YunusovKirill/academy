import { create } from 'zustand';

interface SortState {
  sortCriteria: string;
  setSortCriteria: (criteria: string) => void;
}

export const useSortStore = create<SortState>((set) => ({
  sortCriteria: 'popularity',
  setSortCriteria: (criteria) => set({ sortCriteria: criteria }),
}));