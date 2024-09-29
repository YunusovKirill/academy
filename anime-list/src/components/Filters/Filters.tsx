import React, { useState } from 'react';
import { useAnimeStore } from '../../store/animeStore';

const Filters: React.FC = () => {
  const { setFilters } = useAnimeStore();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('pg13');

  const handleGenreChange = (genreId: number) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updatedGenres);

    // Обновляем фильтры в глобальном состоянии
    setFilters({ genres: updatedGenres });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = event.target.value;
    setSelectedRating(selectedRating);

    // Обновляем рейтинг в глобальных фильтрах
    setFilters({ rating: selectedRating });
  };

  return (
    <div className="filters">
      {/* Фильтрация по жанрам */}
      <div>
        <label>Genres:</label>
        <input type="checkbox" value={1} onChange={() => handleGenreChange(1)} /> Action
        <input type="checkbox" value={2} onChange={() => handleGenreChange(2)} /> Adventure
      </div>

      {/* Фильтрация по рейтингу */}
      <div>
        <label>Rating:</label>
        <select value={selectedRating} onChange={handleRatingChange}>
          <option value="g">G</option>
          <option value="pg">PG</option>
          <option value="pg13">PG-13</option>
          <option value="r">R</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;