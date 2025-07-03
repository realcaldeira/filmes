import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { MovieDetail } from '../types';

const MovieDetailPage: React.FC = () => {
  const { imdbId } = useParams<{ imdbId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!imdbId) return;

      try {
        setLoading(true);
        setError(null);
        const movieDetail = await movieService.getMovieById(imdbId);
        setMovie(movieDetail);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [imdbId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Filme não encontrado</p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
        >
          ← Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
            <div className="lg:col-span-1">
              <div className="aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden shadow-md">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <span>Sem imagem</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{movie.Title}</h1>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {movie.Year}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {movie.Rated}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {movie.Runtime}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      movie.Type === 'movie'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {movie.Type === 'movie' ? 'Filme' : 'Série'}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Gênero:</strong> {movie.Genre}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sinopse</h3>
                <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Equipe</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong className="text-gray-700">Diretor:</strong>{' '}
                      <span className="text-gray-600">{movie.Director}</span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Atores:</strong>{' '}
                      <span className="text-gray-600">{movie.Actors}</span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Roteiristas:</strong>{' '}
                      <span className="text-gray-600">{movie.Writer}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Avaliações</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-medium">IMDb:</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {movie.imdbRating}/10
                      </span>
                      <span className="text-gray-500 text-xs">({movie.imdbVotes} votos)</span>
                    </div>
                    {movie.Metascore && movie.Metascore !== 'N/A' && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">Metacritic:</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {movie.Metascore}/100
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Informações Adicionais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong className="text-gray-700">Lançamento:</strong>{' '}
                    <span className="text-gray-600">{movie.Released}</span>
                  </p>
                  <p>
                    <strong className="text-gray-700">País:</strong>{' '}
                    <span className="text-gray-600">{movie.Country}</span>
                  </p>
                  <p>
                    <strong className="text-gray-700">Idioma:</strong>{' '}
                    <span className="text-gray-600">{movie.Language}</span>
                  </p>
                  {movie.Awards && movie.Awards !== 'N/A' && (
                    <p>
                      <strong className="text-gray-700">Prêmios:</strong>{' '}
                      <span className="text-gray-600">{movie.Awards}</span>
                    </p>
                  )}
                  {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                    <p>
                      <strong className="text-gray-700">Bilheteria:</strong>{' '}
                      <span className="text-gray-600">{movie.BoxOffice}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
