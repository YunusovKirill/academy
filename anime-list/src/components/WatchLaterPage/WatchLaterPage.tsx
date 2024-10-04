import React, { useEffect } from 'react';
import { useWatchLaterStore } from '../../store/watchLaterStore';
import Pagination from '../Pagination/Pagination';

const WatchLaterList: React.FC = () => {
  const { animeList } = useWatchLaterStore();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width <= 768 ? 5 : 10);
    };

    handleResize(); // Initial call

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = animeList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="watch-later-list">
      {paginatedList.map((anime) => (
        <div key={anime.id} className="anime-card">
          <img src={anime.image} alt={anime.title} />
          <h3>{anime.title}</h3>
          <p>Expected Rating: {anime.weight}</p>
        </div>
      ))}
      <Pagination
        totalItems={animeList.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default WatchLaterList;