import React, { useEffect } from 'react';
import { useWatchLaterStore } from '../../store/watchLaterStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import Pagination from '../Pagination/Pagination';

interface Anime {
  id: number;
  title: string;
  image: string;
  weight: number;
}

const WatchLaterPage: React.FC = () => {
  const { animeList } = useWatchLaterStore();
  const { currentPage, itemsPerPage, setPage, setItemsPerPage } = usePaginationStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newItemsPerPage = width <= 768 ? 5 : 10;
      setItemsPerPage(newItemsPerPage);
      setPage(currentPage);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, setPage, setItemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = animeList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="watch-later-page">
      {paginatedList.map((anime: Anime) => (
        <div key={anime.id} className="anime-card">
          <img src={anime.image} alt={anime.title} />
          <h3>{anime.title}</h3>
          <p>Expected Rating: {anime.weight}</p>
        </div>
      ))}
      <Pagination totalItems={animeList.length} />
    </div>
  );
};

export default WatchLaterPage;