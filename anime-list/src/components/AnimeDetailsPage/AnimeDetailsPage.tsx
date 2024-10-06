import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAnimeStore } from '../../store/animeStore';
import { formatDate } from '../../utils/formatDate';

const AnimeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { animeDetail, fetchAnimeDetail } = useAnimeStore();

  useEffect(() => {
    if (id) {
      fetchAnimeDetail(Number(id));
    }
  }, [id, fetchAnimeDetail]);

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
    <div className="anime-details-page">
      <img src={images.jpg.image_url} alt={title} />
      <h1>{title}</h1>
      {title_english && <h2>English: {title_english}</h2>}
      {title_japanese && <h2>Japanese: {title_japanese}</h2>}
      {trailer && trailer.url && (
        <div>
          <h3>Trailer:</h3>
          <iframe src={trailer.url} title="Anime Trailer" />
        </div>
      )}
      <p>Score: {score}</p>
      <p>Rating: {rating}</p>
      <p>Favorites: {favorites}</p>
      <p>Episodes: {episodes || 'Онгоинг'}</p>
      <p>Aired: {aired?.from ? `${formatDate(aired.from) } - ${formatDate(aired.to) || 'Онгоинг'}` : 'Неизвестно'}</p>

      <h3>Studios:</h3>
      <p>{studios.length > 0 ? studios.map((studio) => studio.name).join(', ') : 'Неизвестно'}</p>

      <h3>Genres:</h3>
      <p>{genres.length > 0 ? genres.map((genre) => genre.name).join(', ') : 'Неизвестно'}</p>

      <h3>Themes:</h3>
      <p>{themes.length > 0 ? themes.map((theme) => theme.name).join(', ') : 'Неизвестно'}</p>

      <h3>Related:</h3>
      <p>{related ? JSON.stringify(related) : 'Нет похожих аниме'}</p>

      <h3>Synopsis:</h3>
      <p>{synopsis}</p>
    </div>
  );
};

export default AnimeDetailsPage;