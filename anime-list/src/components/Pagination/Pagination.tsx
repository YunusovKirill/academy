import React from 'react';
import { usePaginationStore } from '../../store/paginatoinStore';

const Pagination: React.FC<{ totalItems: number }> = ({ totalItems }) => {
  const { currentPage, itemsPerPage, setPage } = usePaginationStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => setPage(page);

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;