import React, { useState } from 'react';
import { useAnimeStore } from '../../store/animeStore';

const SearchBar: React.FC = () => {
  const { setFilters } = useAnimeStore();
  const [query, setQuery] = useState('');  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setFilters({ searchQuery: value });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search anime by title..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;