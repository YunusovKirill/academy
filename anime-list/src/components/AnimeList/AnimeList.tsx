import React, { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import AnimeCard from '../AnimeCard/AnimeCard';
import Pagination from '../Pagination/Pagination';

const AnimeList: React.FC = () => {
  const { animeList, fetchAnime } = useAnimeStore();
  const { itemsPerPage, currentPage } = usePaginationStore();

  useEffect(() => {
    fetchAnime(); // Fetch when page or items per page changes
  }, [currentPage, itemsPerPage]);

  return (
    <div className="anime-list">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
      <Pagination totalItems={animeList.length} />
    </div>
  );
};

export default AnimeList;