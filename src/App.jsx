import { useState } from 'react';
import useUniversities from './hooks/useUniversities';
import SearchBar from './components/SearchBar';
import UniversityCard from './components/UniversityCard';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';

import './App.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { 
    universities, 
    totalCount, 
    totalPages, 
    loading, 
    error 
  } = useUniversities(searchTerm, currentPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">
            University Search
          </h1>
          <p className="text-xl text-gray-600">
            {searchTerm ? 
              `${totalCount} universities found` : 
              'Browse universities worldwide'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-8 text-red-500 font-medium">
            Error: {error}
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 
              'No universities match your search' : 
              'No universities found'
            }
          </div>
        ) : (
          <>
            {/* University Cards */}
            <div className="grid gap-6 justify-center md:grid-cols-2 lg:grid-cols-3">
              {universities.map((university) => (
                <UniversityCard 
                  key={`${university.name}-${university.country}`}
                  university={university} 
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;