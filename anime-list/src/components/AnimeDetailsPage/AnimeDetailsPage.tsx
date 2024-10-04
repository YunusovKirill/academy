import React from 'react';

interface AnimeDetailsPageProps {
  anime: {
    title: string;
    image_url: string;
    synopsis: string;
    episodes?: number;
    score?: number;
  };
}

const AnimeDetailsPage: React.FC<AnimeDetailsPageProps> = ({ anime }) => (
  <div className="anime-details">
    <h1>{anime.title}</h1>
    <img src={anime.image_url} alt={anime.title} />
    <p>{anime.synopsis}</p>
    {anime.episodes && <p>Episodes: {anime.episodes}</p>}
    {anime.score && <p>Score: {anime.score}</p>}
  </div>
);

export default AnimeDetailsPage;