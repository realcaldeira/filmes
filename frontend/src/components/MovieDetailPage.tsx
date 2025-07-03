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
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando detalhes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error">
        <p>Filme não encontrado</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
      
      <div className="movie-detail-content">
        <div className="movie-poster-large">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="no-poster-large">
              <span>Sem imagem</span>
            </div>
          )}
        </div>
        
        <div className="movie-info-detailed">
          <h1>{movie.Title}</h1>
          
          <div className="movie-meta">
            <span className="year">{movie.Year}</span>
            <span className="rated">{movie.Rated}</span>
            <span className="runtime">{movie.Runtime}</span>
            <span className="type">{movie.Type === 'movie' ? 'Filme' : 'Série'}</span>
          </div>
          
          <div className="genre">
            <strong>Gênero:</strong> {movie.Genre}
          </div>
          
          <div className="plot">
            <h3>Sinopse</h3>
            <p>{movie.Plot}</p>
          </div>
          
          <div className="credits">
            <div className="director">
              <strong>Diretor:</strong> {movie.Director}
            </div>
            <div className="actors">
              <strong>Atores:</strong> {movie.Actors}
            </div>
            <div className="writers">
              <strong>Roteiristas:</strong> {movie.Writer}
            </div>
          </div>
          
          <div className="ratings">
            <div className="rating">
              <strong>IMDb:</strong> {movie.imdbRating}/10 ({movie.imdbVotes} votos)
            </div>
            {movie.Metascore && movie.Metascore !== 'N/A' && (
              <div className="rating">
                <strong>Metacritic:</strong> {movie.Metascore}/100
              </div>
            )}
          </div>
          
          <div className="additional-info">
            <div><strong>Lançamento:</strong> {movie.Released}</div>
            <div><strong>País:</strong> {movie.Country}</div>
            <div><strong>Idioma:</strong> {movie.Language}</div>
            {movie.Awards && movie.Awards !== 'N/A' && (
              <div><strong>Prêmios:</strong> {movie.Awards}</div>
            )}
            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div><strong>Bilheteria:</strong> {movie.BoxOffice}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
