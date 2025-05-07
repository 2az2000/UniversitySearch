import { useState } from 'react'
import UniversityCard from '../components/UniversityCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import useUniversities from '../hooks/useUniversities'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { universities, loading, error, totalPages } = useUniversities(
    searchTerm,
    currentPage,
    itemsPerPage
  )

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">University Search</h1>
        <p className="text-lg text-gray-600">
          Find universities worldwide by name
        </p>
      </header>

      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 text-lg font-medium">
              Error: {error}
            </div>
          </div>
        ) : universities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((university, index) => (
                <UniversityCard 
                  key={`${university.name}-${index}`} 
                  university={university} 
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : searchTerm ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              No universities found for "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              Enter a university name to start searching
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home