import React, { useState } from 'react';
import { Rating, Status, Type, useAnimeStore } from '../../store/animeStore';

const Filters: React.FC = () => {
  const { setFilters } = useAnimeStore();
  
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [excludedGenres, setExcludedGenres] = useState<number[]>([]);
  const [selectedStudios, setSelectedStudios] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<Rating>(Rating.PG13);
  const [selectedType, setSelectedType] = useState<Type>(Type.TV);
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.Ongoing);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleGenreChange = (genreId: number) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updatedGenres);
    setFilters({ genres: updatedGenres });
  };

  const handleExcludedGenreChange = (genreId: number) => {
    const updatedGenres = excludedGenres.includes(genreId)
      ? excludedGenres.filter(id => id !== genreId)
      : [...excludedGenres, genreId];
    setExcludedGenres(updatedGenres);
    setFilters({ excludedGenres: updatedGenres });
  };

  const handleStudioChange = (studioId: number) => {
    const updatedStudios = selectedStudios.includes(studioId)
      ? selectedStudios.filter(id => id !== studioId)
      : [...selectedStudios, studioId];
    setSelectedStudios(updatedStudios);
    setFilters({ studios: updatedStudios });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = event.target.value as Rating;
    setSelectedRating(selectedRating);
    setFilters({ rating: selectedRating });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value as Type;
    setSelectedType(selectedType);
    setFilters({ type: selectedType });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as Status;
    setSelectedStatus(selectedStatus);
    setFilters({ status: selectedStatus });
  };

  const handleDateChange = () => {
    setFilters({ startDate, endDate });
  };

  return (
    <div className="filters">
      <div>
        <label>Genres:</label>
        <input type="checkbox" value={1} onChange={() => handleGenreChange(1)} /> Action
        <input type="checkbox" value={2} onChange={() => handleGenreChange(2)} /> Adventure
        {/* Дополнительные жанры */}
      </div>

      <div>
        <label>Exclude Genres:</label>
        <input type="checkbox" value={3} onChange={() => handleExcludedGenreChange(3)} /> Comedy
        <input type="checkbox" value={4} onChange={() => handleExcludedGenreChange(4)} /> Drama
        {/* Дополнительные исключённые жанры */}
      </div>

      <div>
        <label>Studios:</label>
        <input type="checkbox" value={1} onChange={() => handleStudioChange(1)} /> Sunrise
        <input type="checkbox" value={2} onChange={() => handleStudioChange(2)} /> Toei Animation
        {/* Дополнительные студии */}
      </div>

      <div>
        <label>Rating:</label>
        <select value={selectedRating} onChange={handleRatingChange}>
          <option value={Rating.G}>G</option>
          <option value={Rating.PG}>PG</option>
          <option value={Rating.PG13}>PG-13</option>
          <option value={Rating.R}>R</option>
        </select>
      </div>

      <div>
        <label>Type:</label>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value={Type.TV}>TV</option>
          <option value={Type.Movie}>Movie</option>
          <option value={Type.OVA}>OVA</option>
          <option value={Type.Special}>Special</option>
        </select>
      </div>

      <div>
        <label>Status:</label>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value={Status.Finished}>Finished</option>
          <option value={Status.Ongoing}>Ongoing</option>
        </select>
      </div>

      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button onClick={handleDateChange}>Apply Date</button>
      </div>
    </div>
  );
};

export default Filters;