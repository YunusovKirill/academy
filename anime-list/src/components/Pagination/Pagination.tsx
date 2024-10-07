import styles from './pagination.module.scss';
import { usePaginationStore } from '../../store/paginatoinStore';

interface PaginationProps {
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const { currentPage, itemsPerPage, setPage } = usePaginationStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    setPage(totalPages);
  }

  const handlePageChange = (page: number) => setPage(page);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button__left}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      > 
        ➪
      </button>
      <span className={styles.pagination__text}>{currentPage} из {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ➪
      </button>
    </div>
  );
};

export default Pagination;