import styles from './animeCard.module.scss'

import { useWatchLaterStore } from "../../store/watchLaterStore";
import { formatDate } from "../../utils/formatDate";
import CustomSelect from '../CustomSelect/CustomSelect';

interface AnimeCardProps {
  anime: {
    mal_id: number;
    title: string;
    image_url: string;
    score: number;
    favorites: number;
    rating: string;
    episodes?: number | string;
    aired?: {
      from?: string;
      to?: string;
    };
  
  };
  weight?: number;
  dateAdded?: number;
  onRemove?: () => void;
  onRatingChange?: (newRating: number) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, weight, dateAdded, onRemove, onRatingChange }) => {
  const { animeList, addAnime } = useWatchLaterStore();

  const isInWatchLater = animeList.some(item => item.mal_id === anime.mal_id);

  const handleAddToWatchLater = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addAnime({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.image_url,
      score: anime.score,
      rating: anime.rating,
      favorites: anime.favorites,
      episodes: anime.episodes || 'Онгоинг',
      weight: 1,
      dateAdded: Date.now(),
    });
  };

  const handleWeightOption = (value: string | number) => {
    if (onRatingChange) {
      onRatingChange(Number(value)); 
    }
  }

  const WeightOption = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ];

  return (
    <div className={styles.anime__card}>
      <img src={anime.image_url} alt={anime.title} />
      <div className={styles.anime__card__content}>
        <h3>{anime.title}</h3>
        <p>Оценка: {anime.score}</p>
        <p>Рейтинг: {anime.rating}</p>
        <p>Избранное: {anime.favorites}</p>
        <p>Эпизоды: {anime.episodes !== undefined ? anime.episodes : 'Онгоинг'}</p>
        <p>Даты выхода: {anime.aired?.from ? `${formatDate(anime.aired.from) } - ${formatDate(anime.aired.to) || 'Онгоинг'}` : 'Неизветсно'}</p>

        {weight !== undefined && (
          <div>
            <p>Ожидаемый рейтинг:</p>
              <div className={styles.anime__card__exp__rating}>
                <CustomSelect
                  options={WeightOption}
                  selected={weight}
                  onChange={handleWeightOption}
                /> 
              </div>
          </div>
        )}

        {dateAdded !== undefined && <p>Дата добавления: {formatDate(new Date(dateAdded).toISOString())}</p>}

        {onRemove && 
        <button className={styles.anime__card__btn}  onClick={(e) => {
        e.stopPropagation();
        onRemove();
        }}>
          Удалить
        </button>}
        {!isInWatchLater && (
          <button className={styles.anime__card__btn} onClick={handleAddToWatchLater}>Посмотреть позже</button>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;