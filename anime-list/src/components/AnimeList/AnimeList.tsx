import React, { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import { useSortStore } from '../../store/sortStore';
import AnimeCard from '../AnimeCard/AnimeCard';
import Pagination from '../Pagination/Pagination';
import SortOptions from '../SortOptions/SortOptions';
import Filters from '../Filters/Filters';

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  rating?: string;
  favorites: number;
  episodes?: number;
  aired?: {
    from?: string;
    to?: string;
  };
  type?: string;
  status?: string;
  genres?: { name: string }[];
  studios?: { name: string }[];
}

const AnimeList: React.FC = () => {
  const { animeList, fetchAnime, filters } = useAnimeStore();
  const { currentPage, itemsPerPage } = usePaginationStore();
  const { sortCriteria } = useSortStore();

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  const genreMap: { [key: number]: string } = {
    1: 'Action',
    2: 'Adventure',
    3: 'Comedy',
    4: 'Drama',
    // Добавь остальные жанры
  };

  const studioMap: { [key: number]: string } = {
    1: 'Sunrise',
    2: 'Toei Animation',
    // Добавить остальные студии
  };

  const filterAnime = (anime: Anime) => {
     // Фильтрация по жанрам через отображение genreMap
    if (filters.genres?.length && !filters.genres.some(genreId => anime.genres?.some(genre => genreMap[genreId] === genre.name))) {
      return false;
    }

    // Фильтрация по исключённым жанрам через отображение genreMap
    if (filters.excludedGenres?.length && filters.excludedGenres.some(genreId => anime.genres?.some(genre => genreMap[genreId] === genre.name))) {
      return false;
    }

    // Фильтрация по рейтингу
    if (filters.rating && anime.rating !== filters.rating) {
      return false;
    }

    // Фильтрация по типу
    if (filters.type && anime.type !== filters.type) {
      return false;
    }

    // Фильтрация по статусу
    if (filters.status && anime.status !== filters.status) {
      return false;
    }

    // Фильтрация по студиям через отображение studioMap
    if (filters.studios?.length && !filters.studios.some(studioId => anime.studios?.some(studio => studio.name === studioMap[studioId]))) {
      return false;
    }

    // Фильтрация по периоду времени (корректная обработка дат)
    const animeStartDate = anime.aired?.from ? Date.parse(anime.aired.from) : null;
    const animeEndDate = anime.aired?.to ? Date.parse(anime.aired.to) : null;
    const filterStartDate = filters.startDate ? Date.parse(filters.startDate) : null;
    const filterEndDate = filters.endDate ? Date.parse(filters.endDate) : null;

    if (filterStartDate && animeStartDate && animeStartDate < filterStartDate) {
      return false;
    }
    if (filterEndDate && animeEndDate && animeEndDate > filterEndDate) {
      return false;
    }

    return true;
  };

  const sortAnime = (a: Anime, b: Anime) => {
    const dateAStart = a.aired?.from ? Date.parse(a.aired.from) : -Infinity;
    const dateBStart = b.aired?.from ? Date.parse(b.aired.from) : -Infinity;
    
    const dateAEnd = a.aired?.to ? Date.parse(a.aired.to) : Infinity;
    const dateBEnd = b.aired?.to ? Date.parse(b.aired.to) : Infinity;
      
    switch (sortCriteria) {
      case 'score':
        return b.score - a.score;
      case 'favorites':
        return b.favorites - a.favorites;
      case 'episodes':
        return (b.episodes || 0) - (a.episodes || 0);
      case 'start':
        return dateAStart - dateBStart;
      case 'end':
        return dateAEnd - dateBEnd;
      default:
        return b.score - a.score;
    }
  };

  // Применяем фильтрацию и сортировку
  const filteredAnimeList = animeList.filter(filterAnime).sort(sortAnime);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredAnimeList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="anime-list">
      <SortOptions />
      <Filters />
      {paginatedList.map((anime: Anime) => {
        return (
          <AnimeCard
            key={anime.mal_id}
            anime={{
              title: anime.title,
              image_url: anime.images.jpg.image_url,
              synopsis: anime.synopsis,
              score: anime.score,
              rating: anime.rating || 'Неизвестно',
              favorites: anime.favorites,
              episodes: anime.episodes,
              aired: {
                from: anime.aired?.from,
                to: anime.aired?.to,
              },
              type: anime.type || 'Неизвестно',
              status: anime.status || 'Неизвестно',
              genres: anime.genres || [],
              studios: anime.studios || [],
            }}
          />
        );
      })}      
      <Pagination totalItems={filteredAnimeList.length} />
    </div>
  );
};

export default AnimeList;