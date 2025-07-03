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
    <div className="home-page">
      <header className="app-header">
        <h1>🎬 Movie Search</h1>
        <p>Busque por seus filmes e series favoritos</p>
      </header>

      <SearchForm onSearch={(filters) => handleSearch(filters, 1)} loading={loading} />

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {searchResults && (
        <div className="search-results">
          <div className="results-info">
            <p>
              Encontrados {totalResults} resultado(s) 
              {currentPage > 1 && ` - Pagina ${currentPage}`}
            </p>
          </div>

          <MovieList
            movies={searchResults.Search || []}
            onMovieClick={handleMovieClick}
            loading={loading}
          />

          {(hasNextPage || hasPrevPage) && (
            <div className="pagination">
              <button 
                onClick={handlePrevPage} 
                disabled={!hasPrevPage || loading}
                className="pagination-button"
              >
                ← Anterior
              </button>
              
              <span className="page-info">Pagina {currentPage}</span>
              
              <button 
                onClick={handleNextPage} 
                disabled={!hasNextPage || loading}
                className="pagination-button"
              >
                Proxima →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
