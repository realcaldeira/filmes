import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import { movieService } from './services/movieService';
import { SearchFilters, SearchResponse, MovieDetail } from './types';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'search' | 'detail'>('search');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true); // Começar como true para mostrar loading inicial
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Carregar todos os filmes na inicialização
  useEffect(() => {
    loadAllMovies(1);
  }, []);

  const loadAllMovies = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(page);
      setIsSearchActive(false);
      setCurrentFilters(null); // Limpar filtros quando carregar todos
      
      console.log('Carregando todos os filmes...', page);
      const results = await movieService.getAllMovies(page);
      console.log('Filmes carregados:', results);
      setSearchResults(results);
      setCurrentView('search');
    } catch (err) {
      setError('Erro ao carregar filmes. Tente novamente.');
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentFilters(filters);
      setCurrentPage(page);
      setIsSearchActive(true);
      
      const results = await movieService.searchMovies(filters, page);
      setSearchResults(results);
      setCurrentView('search');
    } catch (err) {
      setError('Erro ao buscar filmes. Tente novamente.');
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (imdbId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const movieDetail = await movieService.getMovieById(imdbId);
      setSelectedMovie(movieDetail);
      setCurrentView('detail');
    } catch (err) {
      setError('Erro ao carregar detalhes do filme');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedMovie(null);
  };

  const handleNextPage = () => {
    if (isSearchActive && currentFilters) {
      handleSearch(currentFilters, currentPage + 1);
    } else {
      loadAllMovies(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      if (isSearchActive && currentFilters) {
        handleSearch(currentFilters, currentPage - 1);
      } else {
        loadAllMovies(currentPage - 1);
      }
    }
  };

  const handleShowAllMovies = () => {
    setCurrentFilters(null);
    loadAllMovies(1);
  };

  const totalResults = searchResults ? parseInt(searchResults.totalResults) : 0;
  const hasNextPage = currentPage * 10 < totalResults;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="App">
      {currentView === 'search' ? (
        <>
          <header className="app-header">
            <h1>🎬 Movie Search</h1>
            <p>Busque por seus filmes e séries favoritos</p>
          </header>

          <SearchForm onSearch={(filters) => handleSearch(filters, 1)} loading={loading} />

          {currentFilters && (
            <div className="search-actions">
              <button 
                onClick={handleShowAllMovies} 
                className="show-all-button"
                disabled={loading}
              >
                Ver todos os filmes
              </button>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {loading && !searchResults && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando filmes...</p>
            </div>
          )}

          {searchResults && (
            <div className="search-results">
              <div className="results-info">
                <p>
                  {isSearchActive ? 'Resultados da busca: ' : 'Todos os filmes: '} 
                  {totalResults} resultado(s) 
                  {currentPage > 1 && ` - Página ${currentPage}`}
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
                  
                  <span className="page-info">Página {currentPage}</span>
                  
                  <button 
                    onClick={handleNextPage} 
                    disabled={!hasNextPage || loading}
                    className="pagination-button"
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="movie-detail">
          <button className="back-button" onClick={handleBackToSearch}>
            ← Voltar para busca
          </button>
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando detalhes...</p>
            </div>
          ) : selectedMovie ? (
            <div className="movie-detail-content">
              <div className="movie-poster-large">
                {selectedMovie.Poster && selectedMovie.Poster !== 'N/A' ? (
                  <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                ) : (
                  <div className="no-poster-large">
                    <span>Sem imagem</span>
                  </div>
                )}
              </div>
              
              <div className="movie-info-detailed">
                <h1>{selectedMovie.Title}</h1>
                
                <div className="movie-meta">
                  <span className="year">{selectedMovie.Year}</span>
                  <span className="rated">{selectedMovie.Rated}</span>
                  <span className="runtime">{selectedMovie.Runtime}</span>
                  <span className="type">{selectedMovie.Type === 'movie' ? 'Filme' : 'Série'}</span>
                </div>
                
                <div className="genre">
                  <strong>Gênero:</strong> {selectedMovie.Genre}
                </div>
                
                <div className="plot">
                  <h3>Sinopse</h3>
                  <p>{selectedMovie.Plot}</p>
                </div>
                
                <div className="credits">
                  <div className="director">
                    <strong>Diretor:</strong> {selectedMovie.Director}
                  </div>
                  <div className="actors">
                    <strong>Atores:</strong> {selectedMovie.Actors}
                  </div>
                  <div className="writers">
                    <strong>Roteiristas:</strong> {selectedMovie.Writer}
                  </div>
                </div>
                
                <div className="ratings">
                  <div className="rating">
                    <strong>IMDb:</strong> {selectedMovie.imdbRating}/10 ({selectedMovie.imdbVotes} votos)
                  </div>
                  {selectedMovie.Metascore && selectedMovie.Metascore !== 'N/A' && (
                    <div className="rating">
                      <strong>Metacritic:</strong> {selectedMovie.Metascore}/100
                    </div>
                  )}
                </div>
                
                <div className="additional-info">
                  <div><strong>Lançamento:</strong> {selectedMovie.Released}</div>
                  <div><strong>País:</strong> {selectedMovie.Country}</div>
                  <div><strong>Idioma:</strong> {selectedMovie.Language}</div>
                  {selectedMovie.Awards && selectedMovie.Awards !== 'N/A' && (
                    <div><strong>Prêmios:</strong> {selectedMovie.Awards}</div>
                  )}
                  {selectedMovie.BoxOffice && selectedMovie.BoxOffice !== 'N/A' && (
                    <div><strong>Bilheteria:</strong> {selectedMovie.BoxOffice}</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="error">
              <p>Filme não encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
