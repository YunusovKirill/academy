import { useState, useEffect } from "react";
import { fetchAnimeDetails } from "../../api/animeApi";
import AnimeDetailsPage from "../AnimeDetailsPage/AnimeDetailsPage";
import { useParams } from "react-router-dom";

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
  synopsis: string;
  score: number;
  genres: { mal_id: number; name: string }[];
}

const AnimeDetailsLoader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimeDetails = async () => {
      try {
        const response = await fetchAnimeDetails(Number(id));
        const fetchedAnime: Anime = {
          mal_id: response.data.mal_id,
          title: response.data.title,
          image_url: response.data.images.jpg.image_url,
          synopsis: response.data.synopsis,
          score: response.data.score,
          genres: response.data.genres.map((genre: { mal_id: number; name: string }) => ({
            mal_id: genre.mal_id,
            name: genre.name,
          })),
        };
        setAnime(fetchedAnime);
      } catch (error) {
        console.error("Failed to load anime details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimeDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return anime ? <AnimeDetailsPage anime={anime} /> : <div>Anime not found</div>;
};

export default AnimeDetailsLoader;