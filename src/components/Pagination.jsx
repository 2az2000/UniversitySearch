import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const buttonClass = (page) => 
    `px-3 py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`;
  const navButtonClass = 'p-2 rounded-md disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-100';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={navButtonClass}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={buttonClass(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navButtonClass}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;