import React, { useState, useEffect } from 'react';
import { useAnimeStore, Rating, Status, Type } from '../../store/animeStore';

interface Studio {
  mal_id: number;
  name: string;
}

interface Genre {
  mal_id: number;
  name: string;
}

interface Anime {
  mal_id: number;
  title: string;
  studios?: Studio[];
  genres?: Genre[];
}

const getUniqueStudios = (animeList: Anime[]): Studio[] => {
  return [...new Map(
    animeList
      .filter(anime => anime.studios && anime.studios.length > 0)
      .flatMap(anime => anime.studios || [])
      .map(studio => [studio.mal_id, studio])
  ).values()];
};

const getUniqueGenres = (animeList: Anime[]): Genre[] => {
  return [...new Map(
    animeList
      .filter(anime => anime.genres && anime.genres.length > 0)
      .flatMap(anime => anime.genres || [])
      .map(genre => [genre.mal_id, genre])
  ).values()];
};

const Filters: React.FC = () => {
  const { animeList, setFilters } = useAnimeStore();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [excludedGenres, setExcludedGenres] = useState<number[]>([]);
  const [selectedStudios, setSelectedStudios] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [studios, setStudios] = useState<Studio[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    // Извлекаем уникальные студии и жанры из глобального списка аниме
    if (animeList.length > 0) {
      const uniqueStudios = getUniqueStudios(animeList);
      const uniqueGenres = getUniqueGenres(animeList);
      setStudios(uniqueStudios);
      setGenres(uniqueGenres);
    }
  }, [animeList]);

  const handleToggle = (selectedList: number[], setSelected: React.Dispatch<React.SetStateAction<number[]>>, id: number, filterName: string) => {
    const updatedList = selectedList.includes(id)
      ? selectedList.filter(item => item !== id)
      : [...selectedList, id];
    setSelected(updatedList);
    setFilters({ [filterName]: updatedList });
  };

  return (
    <div className="filters">
      {/* Фильтр по жанрам */}
      <div>
        <label>Genres:</label>
        {genres.map((genre) => (
          <div key={genre.mal_id}>
            <input
              type="checkbox"
              value={genre.mal_id}
              onChange={() => handleToggle(selectedGenres, setSelectedGenres, genre.mal_id, 'genres')}
            />
            {genre.name}
          </div>
        ))}
      </div>

      {/* Исключение жанров */}
      <div>
        <label>Exclude Genres:</label>
        {genres.map((genre) => (
          <div key={genre.mal_id}>
            <input
              type="checkbox"
              value={genre.mal_id}
              onChange={() => handleToggle(excludedGenres, setExcludedGenres, genre.mal_id, 'excludedGenres')}
            />
            {genre.name}
          </div>
        ))}
      </div>

      {/* Фильтр по студиям */}
      <div>
        <label>Studios:</label>
        {studios.map((studio) => (
          <div key={studio.mal_id}>
            <input
              type="checkbox"
              value={studio.mal_id}
              onChange={() => handleToggle(selectedStudios, setSelectedStudios, studio.mal_id, 'studios')}
            />
            {studio.name}
          </div>
        ))}
      </div>

      {/* Фильтр по рейтингу */}
      <div>
        <label>Rating:</label>
        <select onChange={(e) => setFilters({ rating: e.target.value as Rating })}>
          <option value={Rating.G}>G</option>
          <option value={Rating.PG}>PG</option>
          <option value={Rating.PG13}>PG-13</option>
          <option value={Rating.R}>R</option>
          <option value={Rating.RPlus}>R+</option>
        </select>
      </div>

      {/* Фильтр по типу */}
      <div>
        <label>Type:</label>
        <select onChange={(e) => setFilters({ type: e.target.value as Type })}>
          <option value={Type.TV}>TV</option>
          <option value={Type.Movie}>Movie</option>
          <option value={Type.OVA}>OVA</option>
          <option value={Type.Special}>Special</option>
        </select>
      </div>

      {/* Фильтр по статусу */}
      <div>
        <label>Status:</label>
        <select onChange={(e) => setFilters({ status: e.target.value as Status })}>
          <option value={Status.Finished}>Finished</option>
          <option value={Status.Ongoing}>Ongoing</option>
        </select>
      </div>

      {/* Фильтр по дате начала и окончания */}
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={() => setFilters({ startDate, endDate })}>Apply Date</button>
      </div>
    </div>
  );
};

export default Filters;