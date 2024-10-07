import styles from './animeDetalsPage.module.scss'

import { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { formatDate } from '../../utils/formatDate';

interface AnimeDetailsPageProps {
  animeId: number;
}

const AnimeDetailsPage: React.FC<AnimeDetailsPageProps> = ({ animeId }) => {
  const { animeDetail, fetchAnimeDetail } = useAnimeStore();

  useEffect(() => {
    if (animeId) {
      fetchAnimeDetail(animeId);
    }
  }, [animeId, fetchAnimeDetail]);

  if (!animeDetail) {
    return <div>Loading...</div>;
  }

  const {
    title,
    title_english,
    title_japanese,
    images,
    score,
    rating,
    favorites,
    episodes,
    aired,
    synopsis,
    studios = [],
    genres = [],
    themes = [],
    related,
    trailer,
  } = animeDetail;

  return (
    <div className={styles.anime__details__page}>
      <img src={images.jpg.image_url} alt={title} />
      <h1>{title}</h1>
      {title_english && <h2>English: {title_english}</h2>}
      {title_japanese && <h2>Japanese: {title_japanese}</h2>}
      {trailer && trailer.url && (
        <div>
          <h3>Трейлер:</h3>
          <iframe src={trailer.url} title="Anime Trailer" />
        </div>
      )}
      <p>Оценка: {score}</p>
      <p>Рейтинг: {rating}</p>
      <p>Избранное: {favorites}</p>
      <p>Эпизоды: {episodes || 'Онгоинг'}</p>
      <p>Дата выхода: {aired?.from ? `${formatDate(aired.from) } - ${formatDate(aired.to) || 'Онгоинг'}` : 'Неизвестно'}</p>

      <h3>Студия:</h3>
      <p>{studios.length > 0 ? studios.map((studio) => studio.name).join(', ') : 'Неизвестно'}</p>

      <h3>Жанры:</h3>
      <p>{genres.length > 0 ? genres.map((genre) => genre.name).join(', ') : 'Неизвестно'}</p>

      <h3>Темы:</h3>
      <p>{themes.length > 0 ? themes.map((theme) => theme.name).join(', ') : 'Неизвестно'}</p>

      <h3>Похожие аниме:</h3>
      <p>{related ? JSON.stringify(related) : 'Нет похожих аниме'}</p>

      <h3>Сюжет:</h3>
      <p>{synopsis}</p>
    </div>
  );
};

export default AnimeDetailsPage;