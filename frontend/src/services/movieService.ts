import { SearchResponse, MovieDetail, SearchFilters } from '../types';

const API_BASE_URL = window.location.hostname === 'localhost' && window.location.port === '3000'
  ? 'http://localhost:8080/api'
  : '/api';

export const movieService = {
  async searchMovies(filters: SearchFilters, page: number = 1): Promise<SearchResponse> {
    const params = new URLSearchParams({
      s: filters.title,
      page: page.toString(),
    });

    if (filters.year) {
      params.append('y', filters.year);
    }

    if (filters.type) {
      params.append('type', filters.type);
    }

    const response = await fetch(`${API_BASE_URL}/movies/search?${params}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar filmes');
    }

    return response.json();
  },

  async getAllMovies(page: number = 1): Promise<SearchResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/movies/all?${params}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar filmes');
    }

    return response.json();
  },

  async getMovieById(imdbId: string): Promise<MovieDetail> {
    const response = await fetch(`${API_BASE_URL}/movies/${imdbId}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do filme');
    }

    return response.json();
  }
};
