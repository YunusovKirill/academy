import axios from 'axios';
import { useAnimeStore } from '../store/animeStore';

const api = axios.create({
  baseURL: 'http://discord.jikan.moe/v4',
  timeout: 10000, // время ожидания ответа
});

// Функция для получения списка аниме

export const fetchAnimeList = async () => {
  const { filters, sortOptions, currentPage } = useAnimeStore.getState();
  
  const params = {
    ...filters,               // Добавляем фильтры
    order_by: sortOptions.order_by, 
    sort: sortOptions.sort,
    page: currentPage,        // Добавляем пагинацию
  };

  const response = await api.get('/anime', { params });
  return response.data;
};

// Функция для получения деталей аниме
export const fetchAnimeDetail = async (mal_id: string) => {
  const response = await api.get(`/anime/${mal_id}`);
  return response.data;
};