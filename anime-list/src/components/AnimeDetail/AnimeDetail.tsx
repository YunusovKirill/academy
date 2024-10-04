import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAnimeStore } from '../../store/animeStore';

interface Genre {
  mal_id: number;
  name: string;
}

interface AnimeDetail {
  title: string;
  image_url: string;
  synopsis: string;
  score: number;
  favorites: number;
  genres: Genre[];
}

const AnimeDetail: React.FC = () => {
  const { mal_id } = useParams<{ mal_id: string }>();
  const { animeDetail, fetchAnimeDetail } = useAnimeStore();

  useEffect(() => {
    if (mal_id) {
      fetchAnimeDetail(Number(mal_id));
    }
  }, [mal_id, fetchAnimeDetail]);

  useEffect(() => {
    if (animeDetail) {
    }
  }, [animeDetail]);

  if (!animeDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="anime-detail">
      <h1>{animeDetail.title}</h1>
      <img src={animeDetail.image_url} alt={animeDetail.title} />
      <p>{animeDetail.synopsis}</p>
      <p>Score: {animeDetail.score}</p>
      <p>Favorites: {animeDetail.favorites}</p>
      <div className="genres">
        {animeDetail.genres.map((genre: Genre) => (
          <span key={genre.mal_id}>{genre.name}</span>
        ))}
      </div>
    </div>
  );
};

export default AnimeDetail;