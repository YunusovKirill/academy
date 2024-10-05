// components/AnimeCard/AnimeCard.tsx
import React from 'react';
import { Studio } from '../../store/animeStore';
import { Genre } from '../../types/types';
import { formatDate } from '../../utils/formatDate'; // Импортируем функцию форматирования
import { useWatchLaterStore } from '../../store/watchLaterStore';

interface AnimeCardProps {
  anime: {
    mal_id: number
    title: string;
    image_url: string;
    synopsis: string;
    score: number;
    rating: string;
    favorites: number;
    episodes?: number;
    aired: {
      from?: string;
      to?: string;
    };
    type: string;
    status: string;
    genres: Genre[];
    studios: Studio[];
  };
  weight?: number; // Ожидаемый рейтинг (передаётся как отдельный пропс)
  dateAdded?: number; // Дата добавления (передаётся как отдельный пропс)
  onRemove?: () => void; // Функция для удаления
  onRatingChange?: (newRating: number) => void; // Функция для изменения рейтинга
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, weight, dateAdded, onRemove, onRatingChange }) => {
  const { animeList, addAnime } = useWatchLaterStore();

  const startDate = formatDate(anime.aired?.from);
  const endDate = formatDate(anime.aired?.to);

  const genres = anime.genres?.map((genre) => genre.name).join(', ') || 'Unknown';
  const studios = anime.studios?.map((studio) => studio.name).join(', ') || 'Unknown';

  const isInWatchLater = animeList.some(item => item.mal_id === anime.mal_id);

  return (
    <div className="anime-card">
      <img src={anime.image_url} alt={anime.title} />
      <h3>{anime.title}</h3>
      <p>Score: {anime.score}</p>
      <p>Rating: {anime.rating}</p>
      <p>Favorites: {anime.favorites}</p>
      <p>Episodes: {anime.episodes || 'Unknown'}</p>
      {startDate && <p>Start Date: {startDate}</p>}
      {endDate && <p>End Date: {endDate}</p>}
      <p>Type: {anime.type || 'Unknown'}</p>
      <p>Status: {anime.status || 'Unknown'}</p>
      <p>Genres: {genres}</p>
      <p>Studios: {studios}</p>
      <p>{anime.synopsis}</p>

      {/* Если передан вес (рейтинг), отображаем его */}
      {weight !== undefined && (
        <div>
          <p>Expected Rating: 
            <select
              value={weight}
              onChange={(e) => onRatingChange && onRatingChange(Number(e.target.value))} // Изменение рейтинга
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </p>
        </div>
      )}

      {/* Если передана дата добавления, отображаем её */}
      {dateAdded !== undefined && <p>Date Added: {formatDate(new Date(dateAdded).toISOString())}</p>}

      {/* Кнопка удаления, если передана функция onRemove */}
      {onRemove && <button onClick={onRemove}>Remove</button>}
      {!isInWatchLater && (
        <button
          onClick={() => addAnime({
            mal_id: anime.mal_id,
            title: anime.title,
            image: anime.image_url,
            synopsis: anime.synopsis,
            score: anime.score,
            rating: anime.rating,
            favorites: anime.favorites,
            episodes: anime.episodes,
            aired: { from: anime.aired?.from, to: anime.aired?.to },
            type: anime.type,
            status: anime.status,
            genres: anime.genres,
            studios: anime.studios,
            weight: 1, // Значение по умолчанию для ожидаемого рейтинга
            dateAdded: Date.now() // Текущая дата
          })}
        >
          Add to Watch Later
        </button>
      )};
    </div>
  );
};

export default AnimeCard;