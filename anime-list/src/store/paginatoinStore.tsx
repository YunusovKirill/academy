import { create } from 'zustand';

interface PaginationState {
  itemsPerPage: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  itemsPerPage: 10,
  currentPage: 1,
  setPage: (page) => set({ currentPage: page }),
}));