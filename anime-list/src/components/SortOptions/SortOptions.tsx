import React from 'react';
import { useSortStore } from '../../store/sortStore';

const SortOptions: React.FC = () => {
  const { sortCriteria, setSortCriteria } = useSortStore();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="sort-options">
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sortCriteria} onChange={handleSortChange}>
        <option value="popularity">Popularity (Score)</option>
        <option value="score">Score</option>
        <option value="favorites">Favorites</option>
        <option value="episodes">Episodes</option>
        <option value="start">Start Date</option>
        <option value="end">End Date</option>
      </select>
    </div>
  );
};

export default SortOptions;