import React, { useEffect, useState } from 'react';
import { useAnimeStore } from './store/animeStore';
import AnimeCard from './AnimeCard';
import Pagination from './components/Pagination/Pagination';
import Filters from './components/Filters/Filters';
import SortOptions from './components/SortOptions/SortOptions';
import SearchBar from './SearchBar';

const AnimeList: React.FC = () => {
  const { animeList, fetchAnime, currentPage, filters, sortOptions } = useAnimeStore();
  
  // Fetch anime when filters, sort options, or pagination change
  useEffect(() => {
    fetchAnime();
  }, [currentPage, filters, sortOptions]);

  return (
    <div className="anime-list">
      <SearchBar />
      <Filters />
      <SortOptions />
      <div className="anime-cards">
        {animeList.map(anime => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default AnimeList;