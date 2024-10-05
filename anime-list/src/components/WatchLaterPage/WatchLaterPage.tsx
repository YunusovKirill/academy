import React, { useEffect } from 'react';
import { useWatchLaterStore } from '../../store/watchLaterStore';
import { usePaginationStore } from '../../store/paginatoinStore';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom'; // Импортируем Link
import AnimeCard from '../AnimeCard/AnimeCard'; // Импортируем AnimeCard

const WatchLaterPage: React.FC = () => {
  const { sortedAnimeList, setWeight, removeAnime } = useWatchLaterStore(); // Подключаем сортировку и удаление
  const { currentPage, itemsPerPage, setPage, setItemsPerPage } = usePaginationStore();

  const [sortBy, setSortBy] = React.useState<'weight' | 'date'>('weight'); // Состояние для сортировки

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
    setWeight(mal_id, weight); // Изменение рейтинга
  };

  const handleRemoveAnime = (mal_id: number) => {
    removeAnime(mal_id); // Удаление аниме
  };

  return (
    <div className="watch-later-page">
      <Link to="/anime-list">Back to Anime List</Link> {/* Ссылка на список аниме */}
      
      {/* Контролы сортировки */}
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'weight' | 'date')}>
          <option value="weight">Weight</option>
          <option value="date">Date Added</option>
        </select>
      </div>

      {paginatedList.map((anime) => (
        <AnimeCard
          key={anime.mal_id}
          anime={{
            mal_id: anime.mal_id,
            title: anime.title,
            image_url: anime.image,
            synopsis: anime.synopsis,
            score: anime.score,
            rating: anime.rating || 'Неизвестно',
            favorites: anime.favorites,
            episodes: anime.episodes,
            aired: {
              from: anime.aired?.from,
              to: anime.aired?.to,
            },
            type: anime.type || 'Неизвестно',
            status: anime.status || 'Неизвестно',
            genres: anime.genres || [],
            studios: anime.studios || [],
        }}
          weight={anime.weight}
          dateAdded={anime.dateAdded} // Дата добавления
          onRemove={() => handleRemoveAnime(anime.mal_id)} // Кнопка удаления
          onRatingChange={(newRating) => handleRatingChange(anime.mal_id, newRating)} // Изменение рейтинга
        />
      ))}
      <Pagination totalItems={paginatedList.length} />
    </div>
  );
};

export default WatchLaterPage;