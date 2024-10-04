import { useState, useEffect } from "react";
import { fetchAnimeDetails } from "../../api/animeApi";
import AnimeDetailsPage from "../AnimeDetailsPage/AnimeDetailsPage";
import { useParams } from "react-router-dom";

const AnimeDetailsLoader: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [anime, setAnime] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadAnimeDetails = async () => {
        try {
          const response = await fetchAnimeDetails(Number(id));
          setAnime(response.data);
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