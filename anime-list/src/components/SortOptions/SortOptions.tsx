import React from 'react';
import { useWatchLaterStore } from '../../store/watchLaterStore';

const SortOptions: React.FC = () => {
  const { sortAnime } = useWatchLaterStore();

  return (
    <div className="sort-options">
      <button onClick={() => sortAnime('weight')}>Sort by Weight</button>
      <button onClick={() => sortAnime('date')}>Sort by Date</button>
    </div>
  );
};

export default SortOptions;