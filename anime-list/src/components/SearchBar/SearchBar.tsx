import styles from './searchBar.module.scss'

import { useState } from 'react';
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
    <div className={styles.search__bar}>
      <input
        type="text"
        placeholder="Напищите название аниме"
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;