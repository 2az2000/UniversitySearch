import { useState, useEffect } from 'react';
import axios from 'axios';

const useUniversities = (searchTerm, page, itemsPerPage = 2) => {
  const [allUniversities, setAllUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all universities
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://universities.hipolabs.com/search?name=sharif');
        setAllUniversities(response.data);
        setFilteredUniversities(response.data);
        console.log(response);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Filter universities
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allUniversities.filter(univ =>
        univ.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities(allUniversities);
    }
  }, [searchTerm, allUniversities]);

  // Pagination
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredUniversities.slice(startIndex, startIndex + itemsPerPage);

  return {
    universities: paginatedData,
    totalCount: filteredUniversities.length,
    totalPages,
    loading,
    error
  };
};

export default useUniversities;