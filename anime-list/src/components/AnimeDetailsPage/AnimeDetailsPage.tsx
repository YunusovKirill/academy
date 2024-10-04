import React from 'react';

interface AnimeDetailsPageProps {
  anime: {
    title: string;
    image_url: string;
    synopsis: string;
    [key: string]: any;
  };
}

const AnimeDetailsPage: React.FC<AnimeDetailsPageProps> = ({ anime }) => (
  <div className="anime-details">
    <h1>{anime.title}</h1>
    <img src={anime.image_url} alt={anime.title} />
    <p>{anime.synopsis}</p>
    {/* Можно добавить больше информации о аниме */}
  </div>
);

export default AnimeDetailsPage;