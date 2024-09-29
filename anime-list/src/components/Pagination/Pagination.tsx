import React from 'react';
import { useAnimeStore } from '../../store/animeStore';

const Pagination: React.FC = () => {
  const { currentPage, setPage } = useAnimeStore();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
        </button>
    </div>
    )
};

export default Pagination;