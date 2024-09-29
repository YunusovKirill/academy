import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAnimeStore } from '../store/animeStore';

const AnimeDetail: React.FC = () => {
  const { mal_id } = useParams<{ mal_id: string }>();
  const { animeDetail, fetchAnimeDetail } = useAnimeStore();

  useEffect(() => {
    fetchAnimeDetail(mal_id);
  }, [mal_id]);

  return (
    <div className="anime-detail">
      <h1>{animeDetail.title}</h1>
      <img src={animeDetail.image_url} alt={animeDetail.title} />
      <p>{animeDetail.synopsis}</p>
      <p>Score: {animeDetail.score}</p>
      <p>Favorites: {animeDetail.favorites}</p>
      <div className="genres">
        {animeDetail.genres.map(genre => (
          <span key={genre.mal_id}>{genre.name}</span>
        ))}
      </div>
      {/* Остальные данные: трейлер, продюсеры, связанные аниме */}
    </div>
  );
};

export default AnimeDetail;