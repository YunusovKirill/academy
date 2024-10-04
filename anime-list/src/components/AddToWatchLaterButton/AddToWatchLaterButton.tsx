import React from 'react';
import { useWatchLaterStore } from '../../store/watchLaterStore';

const AddToWatchLaterButton: React.FC<{ anime: any }> = ({ anime }) => {
  const { addAnime } = useWatchLaterStore();

  const handleAdd = () => {
    const weight = prompt('Expected rating (1-10):', '1');
    addAnime({
      id: anime.mal_id,
      title: anime.title,
      image: anime.image_url,
      weight: Number(weight) || 1,
    });
  };

  return <button onClick={handleAdd}>Add to Watch Later</button>;
};

export default AddToWatchLaterButton;