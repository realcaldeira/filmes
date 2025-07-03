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
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[1.03] hover:border-blue-400"
    >
      <div className="aspect-[2/3] bg-gray-100 flex items-center justify-center">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
            <span className="text-sm">Sem imagem disponível</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
          {movie.Title}
        </h3>

        <div className="flex items-center justify-between text-xs">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            {movie.Year}
          </span>
          <span
            className={`px-3 py-1 rounded-full ${
              movie.Type === 'movie'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {movie.Type === 'movie' ? 'Filme' : 'Série'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
