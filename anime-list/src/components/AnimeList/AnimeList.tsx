import React, { useEffect, useState } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import { useSortStore } from '../../store/sortStore';
import AnimeCard from '../AnimeCard/AnimeCard';
import Pagination from '../Pagination/Pagination';
import styles from './animeList.module.scss';
import { Modal } from '../Modal/Modal';
import AnimeDetailsPage from '../AnimeDetailsPage/AnimeDetailsPage';
import Header from '../Header/Header';

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  favorites: number;
  rating?: string;
  episodes?: number | string; 
  aired?: {
    from?: string;
    to?: string;
  };
}

const AnimeList: React.FC = () => {
  const { filteredAnimeList, fetchAnime } = useAnimeStore();
  const { currentPage, itemsPerPage } = usePaginationStore();
  const { sortCriteria } = useSortStore();
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  const sortAnime = (a: Anime, b: Anime): number => {
    const dateAStart = a.aired?.from && !isNaN(Date.parse(a.aired.from)) 
      ? new Date(a.aired.from).getTime() 
      : -Infinity;  
  
    const dateBStart = b.aired?.from && !isNaN(Date.parse(b.aired.from)) 
      ? new Date(b.aired.from).getTime() 
      : -Infinity;  
  
    const dateAEnd = a.aired?.to && !isNaN(Date.parse(a.aired.to)) 
      ? new Date(a.aired.to).getTime() 
      : Infinity;
      
    const dateBEnd = b.aired?.to && !isNaN(Date.parse(b.aired.to)) 
      ? new Date(b.aired.to).getTime() 
      : Infinity;
      
    switch (sortCriteria) {
      case 'score':
        return b.score - a.score;
      case 'favorites':
        return b.favorites - a.favorites;
      case 'episodes': {
        const episodesA = typeof a.episodes === 'number' ? a.episodes : 0;
        const episodesB = typeof b.episodes === 'number' ? b.episodes : 0;
        return episodesB - episodesA };
      case 'start':
        return dateAStart - dateBStart;
      case 'end':
        return dateAEnd - dateBEnd;
      default:
        return b.score - a.score;
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const sortedAnimeList = [...filteredAnimeList].sort(sortAnime);
  const paginatedList = sortedAnimeList.slice(startIndex, startIndex + itemsPerPage);

  const handleAnimeClick = (animeId: number) => {
    setSelectedAnimeId(animeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.anime__list}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.anime__list__title}>Список аниме</h1>
        <div className={styles.anime__list__content}>
          {paginatedList.map((anime: Anime) => (
            <div className={styles.anime__list__items} key={anime.mal_id} onClick={() => handleAnimeClick(anime.mal_id)}>
              <AnimeCard
                anime={{
                  mal_id: anime.mal_id,
                  title: anime.title,
                  image_url: anime.images.jpg.image_url,
                  score: anime.score,
                  rating: anime.rating || 'Неизвестно',
                  favorites: anime.favorites,
                  episodes: anime.episodes || 'Онгоинг',
                  aired: anime.aired,
                }}
              />
            </div>
          ))}      
        </div>
        <Pagination totalItems={filteredAnimeList.length} />
        {/* Модальное окно для деталей аниме */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedAnimeId && <AnimeDetailsPage animeId={selectedAnimeId} />}
        </Modal>
        </div>
    </div>
  );
};

export default AnimeList;
