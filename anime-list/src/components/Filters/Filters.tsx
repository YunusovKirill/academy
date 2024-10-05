import React, { useState, useEffect } from 'react';
import { useAnimeStore, Rating, Status, Type } from '../../store/animeStore';

// Определение интерфейсов для структуры аниме и студий
interface Studio {
  id: number;
  name: string;
}

interface Anime {
  mal_id: number;
  title: string;
  studios: Studio[];
}

// Функция для извлечения уникальных студий из списка аниме
const getUniqueStudios = (animeList: Anime[]): Studio[] => {
  return [...new Map(
    animeList.flatMap(anime => anime.studios) // Извлекаем студии из каждого объекта аниме
    .map(studio => [studio.id, studio])      // Создаем Map для фильтрации уникальных студий
  ).values()];
};

const Filters: React.FC = () => {
  const { animeList, setFilters } = useAnimeStore(); // Используем глобальное состояние для получения списка аниме
  // const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  // const [excludedGenres, setExcludedGenres] = useState<number[]>([]);
  const [selectedStudios, setSelectedStudios] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
    // Извлекаем уникальные студии из глобального списка аниме
    if (animeList.length > 0) {
      const uniqueStudios = getUniqueStudios(animeList);
      setStudios(uniqueStudios);
    }
  }, [animeList]); // Вызываем useEffect при изменении списка аниме

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
        {/* Здесь можно отобразить список жанров */}
      </div>

      {/* Исключение жанров */}
      <div>
        <label>Exclude Genres:</label>
        {/* Здесь можно отобразить список жанров для исключения */}
      </div>

      {/* Фильтр по студиям */}
      <div>
        <label>Studios:</label>
        {studios.map((studio) => (
          <div key={studio.id}>
            <input
              type="checkbox"
              value={studio.id}
              onChange={() => handleToggle(selectedStudios, setSelectedStudios, studio.id, 'studios')}
            />
            {studio.name}
          </div>
        ))}
      </div>

      {/* Фильтр по дате начала и окончания */}
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={() => setFilters({ startDate, endDate })}>Apply Date</button>
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
    </div>
  );
};

export default Filters;