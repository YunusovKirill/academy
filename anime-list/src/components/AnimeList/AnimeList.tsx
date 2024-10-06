import React, { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import { useSortStore } from '../../store/sortStore';
import AnimeCard from '../AnimeCard/AnimeCard';
import Pagination from '../Pagination/Pagination';
import SortOptions from '../SortOptions/SortOptions';
import Filters from '../Filters/Filters';
import SearchBar from '../SearchBar/SearchBar';
import { Link, useNavigate } from 'react-router-dom'; // Добавляем навигацию

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  favorites: number;
  rating?: string;
  episodes?: number | string; 
  aired?: {
    from?: string;
    to?: string;
  };
}

const AnimeList: React.FC = () => {
  const { filteredAnimeList, fetchAnime } = useAnimeStore();
  const { currentPage, itemsPerPage } = usePaginationStore();
  const { sortCriteria } = useSortStore();
  const navigate = useNavigate(); // Используем навигацию

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  const sortAnime = (a: Anime, b: Anime): number => {
    const dateAStart = a.aired?.from && !isNaN(Date.parse(a.aired.from)) 
      ? new Date(a.aired.from).getTime() 
      : -Infinity;  
  
    const dateBStart = b.aired?.from && !isNaN(Date.parse(b.aired.from)) 
      ? new Date(b.aired.from).getTime() 
      : -Infinity;  
  
    const dateAEnd = a.aired?.to && !isNaN(Date.parse(a.aired.to)) 
      ? new Date(a.aired.to).getTime() 
      : Infinity;
      
    const dateBEnd = b.aired?.to && !isNaN(Date.parse(b.aired.to)) 
      ? new Date(b.aired.to).getTime() 
      : Infinity;
      
    switch (sortCriteria) {
      case 'score':
        return b.score - a.score;
      case 'favorites':
        return b.favorites - a.favorites;
      case 'episodes':
        const episodesA = typeof a.episodes === 'number' ? a.episodes : 0;
        const episodesB = typeof b.episodes === 'number' ? b.episodes : 0;
        return episodesB - episodesA;
      case 'start':
        return dateAStart - dateBStart;
      case 'end':
        return dateAEnd - dateBEnd;
      default:
        return b.score - a.score;
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const sortedAnimeList = [...filteredAnimeList].sort(sortAnime);
  const paginatedList = sortedAnimeList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="anime-list">
      <Link to="/watch-later">Go to Watch Later</Link>
      <SearchBar />
      <SortOptions />
      <Filters />
      {paginatedList.map((anime: Anime) => (
        <div key={anime.mal_id} onClick={() => navigate(`/anime/${anime.mal_id}`)}>
          <AnimeCard
            anime={{
              mal_id: anime.mal_id,
              title: anime.title,
              image_url: anime.images.jpg.image_url,
              score: anime.score,
              rating: anime.rating || 'Неизвестно',
              favorites: anime.favorites,
              episodes: anime.episodes || 'Онгоинг',
              aired: anime.aired,
            }}
          />
        </div>
      ))}      
      <Pagination totalItems={filteredAnimeList.length} />
    </div>
  );
};

export default AnimeList;