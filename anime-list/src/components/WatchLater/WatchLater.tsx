import React from 'react';
import { useWatchLaterStore } from '../store/watchLaterStore';
import WatchLaterCard from './WatchLaterCard';
import WatchLaterSortOptions from './WatchLaterSortOptions';
import Pagination from './Pagination';

const WatchLater: React.FC = () => {
  const { watchLaterList, currentPage, sortOptions } = useWatchLaterStore();

  return (
    <div className="watch-later">
      <h1>Watch Later</h1>
      <WatchLaterSortOptions />
      <div className="watch-later-cards">
        {watchLaterList.map(anime => (
          <WatchLaterCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default WatchLater;