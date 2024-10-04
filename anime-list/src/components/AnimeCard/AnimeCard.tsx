import React from 'react';

interface AnimeCardProps {
  anime: {
    image_url: string;
    title: string;
    score: number;
    rating: string;
    synopsis: string;
    favorites: number;
    episodes?: number;
    aired?: {
      from?: string;
      to?: string;
    };
    type?: string;
    status?: string;
    genres?: { name: string }[];
    studios?: { name: string }[];
  };
}

const formatDate = (dateString?: string): string => {
  if (!dateString || isNaN(Date.parse(dateString))) return '';
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const startDate = formatDate(anime.aired?.from);
  const endDate = formatDate(anime.aired?.to);

  const genres = anime.genres?.map((genre) => genre.name).join(', ') || 'Unknown';
  const studios = anime.studios?.map((studio) => studio.name).join(', ') || 'Unknown';

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
    </div>
  );
};

export default AnimeCard;