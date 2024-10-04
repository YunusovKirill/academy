import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
});

interface FetchAnimeListParams {
  page?: number;
  limit?: number;
  q?: string;
  type?: string;
  rating?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  genres?: string;
  genres_exclude?: string;
  producers?: string;
  order_by?: string;
  sort?: 'asc' | 'desc';
}

export const fetchAnimeListFromAPI = (params: FetchAnimeListParams) => {
  return api.get('/anime', { params });
};

export const fetchAnimeDetails = (id: number) => {
  return api.get(`/anime/${id}`);
};