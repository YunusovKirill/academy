import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  selectedAnimeId: number | null;
  openModal: (animeId: number) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  selectedAnimeId: null,
  openModal: (animeId: number) => set({ isModalOpen: true, selectedAnimeId: animeId }),
  closeModal: () => set({ isModalOpen: false, selectedAnimeId: null }),
}));