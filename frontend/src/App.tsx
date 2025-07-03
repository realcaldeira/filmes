import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import { movieService } from './services/movieService';
import { SearchFilters, SearchResponse, MovieDetail } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'search' | 'detail'>('search');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    loadAllMovies(1);
  }, []);

  const loadAllMovies = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(page);
      setIsSearchActive(false);
      setCurrentFilters(null);

      const results = await movieService.getAllMovies(page);
      setSearchResults(results);
      setCurrentView('search');
    } catch {
      setError('Erro ao carregar filmes. Tente novamente.');
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
    } catch {
      setError('Erro ao buscar filmes. Tente novamente.');
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
    } catch {
      setError('Erro ao carregar detalhes do filme');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedMovie(null);
  };

  const handleNextPage = () => {
    if (isSearchActive && currentFilters) handleSearch(currentFilters, currentPage + 1);
    else loadAllMovies(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      if (isSearchActive && currentFilters) handleSearch(currentFilters, currentPage - 1);
      else loadAllMovies(currentPage - 1);
    }
  };

  const totalResults = searchResults ? parseInt(searchResults.totalResults) : 0;
  const hasNextPage = currentPage * 10 < totalResults;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <motion.header
        className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 shadow-lg mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-white tracking-wider">🎥 Cinema Finder</h1>
          <nav className="space-x-4">
            <button
              onClick={() => loadAllMovies(1)}
              className="text-white hover:underline focus:outline-none font-medium transition-transform transform hover:scale-105"
            >
              Todos
            </button>
          </nav>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 pb-12 relative">
        <AnimatePresence mode="wait">
          {currentView === 'search' ? (
            <motion.section
              key="search"
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SearchForm onSearch={(filters) => handleSearch(filters, 1)} loading={loading} />

              {error && (
                <motion.div
                  className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p>{error}</p>
                </motion.div>
              )}

              {loading && !searchResults && (
                <div className="flex flex-col items-center py-16">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75" />
                  </motion.svg>
                  <p className="mt-4 text-lg">Carregando filmes...</p>
                </div>
              )}

              {searchResults && (
                <>
                  <motion.div
                    className="flex flex-wrap justify-between items-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-lg font-medium">
                      {isSearchActive ? 'Resultados da busca:' : 'Todos os filmes:'}{' '}
                      <span className="text-blue-600">{totalResults}</span>
                    </p>
                    {currentFilters && (
                      <button
                        onClick={() => loadAllMovies(1)}
                        disabled={loading}
                        className="text-blue-600 hover:underline focus:outline-none font-medium transition-transform transform hover:scale-105"
                      >
                        Limpar busca
                      </button>
                    )}
                  </motion.div>

                  <MovieList movies={searchResults.Search || []} onMovieClick={handleMovieClick} loading={loading} />

                  {(hasNextPage || hasPrevPage) && (
                    <motion.div
                      className="flex justify-center items-center space-x-4 mt-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <button
                        onClick={handlePrevPage}
                        disabled={!hasPrevPage || loading}
                        className="px-5 py-2 bg-white border border-gray-300 rounded shadow transition-transform transform hover:scale-105 disabled:opacity-50"
                      >
                        ← Anterior
                      </button>
                      <span className="text-gray-700 font-medium animate-pulse">Página {currentPage}</span>
                      <button
                        onClick={handleNextPage}
                        disabled={!hasNextPage || loading}
                        className="px-5 py-2 bg-white border border-gray-300 rounded shadow transition-transform transform hover:scale-105 disabled:opacity-50"
                      >
                        Próxima →
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </motion.section>
          ) : (
            <motion.section
              key="detail"
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                className="mb-6 text-blue-600 hover:underline flex items-center font-medium transition-transform transform hover:scale-105"
                onClick={handleBackToSearch}
                whileHover={{ scale: 1.05 }}
              >
                ← Voltar
              </motion.button>

              {loading ? (
                <div className="flex flex-col items-center py-16">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75" />
                  </motion.svg>
                  <p className="mt-4 text-lg">Carregando detalhes...</p>
                </div>
              ) : selectedMovie ? (
                <div className="grid lg:grid-cols-3 gap-8">
                  <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {selectedMovie.Poster && selectedMovie.Poster !== 'N/A' ? (
                      <img
                        src={selectedMovie.Poster}
                        alt={selectedMovie.Title}
                        className="rounded-lg shadow-xl max-h-[460px]"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-200 rounded-lg h-80 w-full">
                        <span className="text-gray-500">Sem imagem</span>
                      </div>
                    )}
                  </motion.div>

                  <div className="lg:col-span-2 space-y-6">
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl font-bold">{selectedMovie.Title}</motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>{selectedMovie.Year}</span><span>•</span><span>{selectedMovie.Runtime}</span><span>•</span><span>{selectedMovie.Type === 'movie' ? 'Filme' : 'Série'}</span>
                    </motion.div>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-700 leading-relaxed">{selectedMovie.Plot}</motion.p>
                    {/* ...restante do detalhe ... */}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <p>Filme não encontrado</p>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <motion.footer
        className="bg-gray-100 py-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2025 Cinema Finder. Todos os direitos reservados.
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
