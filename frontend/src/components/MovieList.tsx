import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (imdbId: string) => void;
  loading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando filmes...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <p>Nenhum filme encontrado. Tente uma nova busca.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieList;
