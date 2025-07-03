import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (imdbId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleClick = () => {
    onClick(movie.imdbID);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <div className="no-poster">
            <span>Sem imagem disponivel</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-details">
          <span className="movie-year">{movie.Year}</span>
          <span className="movie-type">
            {movie.Type === 'movie' ? 'Filme' : 'Serie'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
