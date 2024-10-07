import styles from './watchLaterPage.module.scss'

import { useEffect } from 'react';
import { useWatchLaterStore } from '../../store/watchLaterStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import { useHeaderSortStore } from '../../store/headerSortStore';
import { useModalStore } from '../../store/modalStore';
import Pagination from '../Pagination/Pagination';
import AnimeCard from '../AnimeCard/AnimeCard';
import Header from '../Header/Header';
import AnimeDetailsPage from '../AnimeDetailsPage/AnimeDetailsPage';
import Modal from '../Modal/Modal';

const WatchLaterPage: React.FC = () => {
  const { sortedAnimeList, setWeight, removeAnime } = useWatchLaterStore();
  const { currentPage, itemsPerPage, setPage, setItemsPerPage } = usePaginationStore();
  const { sortBy } = useHeaderSortStore();
  const { isModalOpen, selectedAnimeId, openModal, closeModal } = useModalStore(); 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newItemsPerPage = width <= 768 ? 5 : 10;
      setItemsPerPage(newItemsPerPage);
      setPage(currentPage);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, setPage, setItemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = sortedAnimeList(sortBy).slice(startIndex, startIndex + itemsPerPage);

  const handleRatingChange = (mal_id: number, weight: number) => {
    setWeight(mal_id, weight);
  };

  const handleRemoveAnime = (mal_id: number) => {
    removeAnime(mal_id);
  };

  return (
    <div className={styles.wl__page}>
      <Header />
      <div className={styles.container}>
          {paginatedList.map((anime) => (
            <div key={anime.mal_id} className={styles.wl__page__content} onClick={() => openModal(anime.mal_id)}>
              <AnimeCard
                key={anime.mal_id}
                anime={{
                  mal_id: anime.mal_id,
                  title: anime.title,
                  image_url: anime.image,
                  score: anime.score,
                  rating: anime.rating,
                  favorites: anime.favorites,
                  aired: anime.aired,
                }}
                weight={anime.weight}
                dateAdded={anime.dateAdded}
                onRemove={() => handleRemoveAnime(anime.mal_id)}
                onRatingChange={(newRating) => handleRatingChange(anime.mal_id, newRating)}
              />
            </div>
          ))}
      </div>
      <Pagination totalItems={paginatedList.length} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedAnimeId && <AnimeDetailsPage animeId={selectedAnimeId} />}
      </Modal>
    </div>
  );
};

export default WatchLaterPage;