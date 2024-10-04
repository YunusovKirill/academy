import { useWatchLaterStore } from '../../store/watchLaterStore';

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
}

interface AddToWatchLaterButtonProps {
  anime: Anime;
}

const AddToWatchLaterButton: React.FC<AddToWatchLaterButtonProps> = ({ anime }) => {
  const { addAnime } = useWatchLaterStore();

  const handleAdd = () => {
    const weight = prompt('Expected rating (1-10):', '1');
    const parsedWeight = Number(weight);
    addAnime({
      id: anime.mal_id,
      title: anime.title,
      image: anime.image_url,
      weight: !isNaN(parsedWeight) && parsedWeight > 0 ? parsedWeight : 1,
      addedAt: 0,
    });
  };

  return <button onClick={handleAdd}>Add to Watch Later</button>;
};

export default AddToWatchLaterButton;