import React from 'react';
import { useAnimeStore } from '../../store/animeStore';

const SortOptions: React.FC = () => {
  const { setSortOptions } = useAnimeStore();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSortOptions({ order_by: selectedSort, sort: 'desc' });
  };

  return (
    <div className="sort-options">
      <label>Sort by:</label>
      <select onChange={handleSortChange}>
        <option value="popularity">Popularity</option>
        <option value="score">Score</option>
        <option value="episodes">Episodes</option>
        <option value="favorites">Favorites</option>
      </select>
    </div>
  );
};

export default SortOptions;