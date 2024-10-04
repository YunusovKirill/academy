import React from 'react';

const AnimeCard: React.FC<{ anime: any }> = ({ anime }) => (
  <div className="anime-card">
    <img src={anime.image_url} alt={anime.title} />
    <h3>{anime.title}</h3>
    <p>Score: {anime.score}</p>
    <p>Rating: {anime.rating}</p>
  </div>
);

export default AnimeCard;