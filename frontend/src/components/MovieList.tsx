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
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Carregando filmes...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nenhum filme encontrado. Tente uma nova busca.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
