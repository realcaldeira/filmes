import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import MovieList from './MovieList';
import { movieService } from '../services/movieService';
import { SearchFilters, SearchResponse } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);

  const handleSearch = async (filters: SearchFilters, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentFilters(filters);
      setCurrentPage(page);

      const results = await movieService.searchMovies(filters, page);
      setSearchResults(results);
    } catch (err) {
      setError('Erro ao buscar filmes. Tente novamente.');
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (imdbId: string) => {
    navigate(`/movie/${imdbId}`);
  };

  const handleNextPage = () => {
    if (currentFilters) {
      handleSearch(currentFilters, currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentFilters && currentPage > 1) {
      handleSearch(currentFilters, currentPage - 1);
    }
  };

  const totalResults = searchResults ? parseInt(searchResults.totalResults) : 0;
  const hasNextPage = currentPage * 10 < totalResults;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            🎬 Movie Search
          </h1>
          <p className="text-lg text-gray-500 mt-3">
            Encontre seus filmes e séries favoritos em segundos.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <SearchForm onSearch={(filters) => handleSearch(filters, 1)} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 rounded-xl p-4 mb-6 shadow-sm">
            <p>{error}</p>
          </div>
        )}

        {searchResults && (
          <div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 mb-6">
              <p className="text-gray-700">
                Encontrados <span className="font-semibold">{totalResults}</span> resultado(s)
                {currentPage > 1 && (
                  <span className="text-gray-500"> — Página {currentPage}</span>
                )}
              </p>
            </div>

            <MovieList
              movies={searchResults.Search || []}
              onMovieClick={handleMovieClick}
              loading={loading}
            />

            {(hasNextPage || hasPrevPage) && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={handlePrevPage}
                  disabled={!hasPrevPage || loading}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  ← Anterior
                </button>

                <span className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full shadow-inner">
                  Página {currentPage}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={!hasNextPage || loading}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  Próxima →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
