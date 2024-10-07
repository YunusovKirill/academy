import { useState, useEffect } from 'react';
import { useAnimeStore, Rating, Status, Type } from '../../store/animeStore';
import Dropdown from '../Dropdown/Dropdown';
import CustomSelect from '../CustomSelect/CustomSelect';  // Импортируем кастомный селектор
import { useFilterStore } from '../../store/filterStore';
import styles from './filters.module.scss';

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
  const {
    selectedGenres,
    excludedGenres,
    rating,
    type,
    status,
    setSelectedGenres,
    setExcludedGenres,
    setRating,
    setType,
    setStatus
  } = useFilterStore();
  
  const [selectedStudios, setSelectedStudios] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [studios, setStudios] = useState<Studio[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (animeList.length > 0) {
      const uniqueStudios = getUniqueStudios(animeList);
      const uniqueGenres = getUniqueGenres(animeList);
      setStudios(uniqueStudios);
      setGenres(uniqueGenres);
    }
  }, [animeList]);

  // -------------- Обработчики

  const handleToggle = (selectedList: number[], setSelected: React.Dispatch<React.SetStateAction<number[]>>, id: number, filterName: string) => {
    const updatedList = selectedList.includes(id)
      ? selectedList.filter(item => item !== id)
      : [...selectedList, id];
    setSelected(updatedList);
    setFilters({ [filterName]: updatedList });
  };

  const handleToggleGenre = (id: number) => {
    if (excludedGenres.includes(id)) {
      return;
    }
    const updatedGenres = selectedGenres.includes(id)
      ? selectedGenres.filter(genre => genre !== id)
      : [...selectedGenres, id];

    setSelectedGenres(updatedGenres);
    setFilters({ genres: updatedGenres });
  };

  const handleToggleExcludedGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      return;
    }
    const updatedExcludedGenres = excludedGenres.includes(id)
      ? excludedGenres.filter(genre => genre !== id)
      : [...excludedGenres, id];

    setExcludedGenres(updatedExcludedGenres);
    setFilters({ excludedGenres: updatedExcludedGenres });
  };

  const handleSelectRating = (value: string) => {
    setRating(value as Rating);
    setFilters({ rating: value });
  };

  const handleSelectType = (value: string) => {
    setType(value as Type);
    setFilters({ type: value });
  };

  const handleSelectStatus = (value: string) => {
    setStatus(value as Status);
    setFilters({ status: value });


  };

  const handleResetDateFilters = () => {
    setStartDate('');
    setEndDate('');
    setFilters({ startDate: '', endDate: '' });
  };
  
  // -------------- Массивы для кастомного селекта

  const ratingOptions = [
    { value: '', label: 'Показать все' },
    { value: Rating.G, label: 'G' },
    { value: Rating.PG, label: 'PG' },
    { value: Rating.PG13, label: 'PG-13' },
    { value: Rating.R, label: 'R' },
    { value: Rating.RPlus, label: 'R+' },
  ];

  const typeOptions = [
    { value: '', label: 'Показать все' },
    { value: Type.TV, label: 'TV' },
    { value: Type.Movie, label: 'Movie' },
    { value: Type.OVA, label: 'OVA' },
    { value: Type.Special, label: 'Special' },
  ];

  const statusOptions = [
    { value: '', label: 'Показать все' },
    { value: Status.Finished, label: 'Окончен' },
    { value: Status.Ongoing, label: 'Онгоинг' },
  ];

  return (
    <div className={styles.filters}>
      <Dropdown label="Жанры">
        {genres.map((genre) => (
          <div className={styles.filters__checkbox} key={genre.mal_id}>
            <input
              type="checkbox"
              value={genre.mal_id}
              checked={selectedGenres.includes(genre.mal_id)}
              disabled={excludedGenres.includes(genre.mal_id)}
              onChange={() => handleToggleGenre(genre.mal_id)}
            />
            {genre.name}
          </div>
        ))}
      </Dropdown>

      <Dropdown label="Исключить жанр">
        {genres.map((genre) => (
          <div className={styles.filters__checkbox} key={genre.mal_id}>
            <input
              type="checkbox"
              value={genre.mal_id}
              checked={excludedGenres.includes(genre.mal_id)}
              disabled={selectedGenres.includes(genre.mal_id)}
              onChange={() => handleToggleExcludedGenre(genre.mal_id)}
            />
            {genre.name}
          </div>
        ))}
      </Dropdown>

      <Dropdown label="Студии">
        {studios.map((studio) => (
          <div className={styles.filters__checkbox} key={studio.mal_id}>
            <input
              type="checkbox"
              value={studio.mal_id}
              checked={selectedStudios.includes(studio.mal_id)}
              onChange={() => handleToggle(selectedStudios, setSelectedStudios, studio.mal_id, 'studios')}
            />
            {studio.name}
          </div>
        ))}
      </Dropdown>

      <Dropdown label="Рейтинг">
        <CustomSelect
          options={ratingOptions}
          selected={rating || ''}
          onChange={handleSelectRating}
        />
      </Dropdown>

      <Dropdown label="Тип аниме">
        <CustomSelect
          options={typeOptions}
          selected={type || ''}
          onChange={handleSelectType}
        />
      </Dropdown>

      <Dropdown label="Статус">
        <CustomSelect
          options={statusOptions}
          selected={status || ''}
          onChange={handleSelectStatus}
        />
      </Dropdown>

      <Dropdown label="Период выхода">
        <div className={styles.filters__date}>
          <label className={styles.filters__date__label}>Начало:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label className={styles.filters__date__label}>Конец:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button className={styles.filters__date__btn} onClick={() => setFilters({ startDate, endDate })}>Применить</button>
          <button className={styles.filters__date__btn} onClick={handleResetDateFilters}>Сбросить дату</button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filters;