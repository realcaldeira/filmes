import React, { useState } from 'react';
import { SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    year: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.title.trim()) {
      onSearch(filters);
    }
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFilters({
      title: '',
      year: '',
      type: '',
    });
  };

  const hasFilters = filters.title || filters.year || filters.type;

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-group">
        <div className="input-wrapper">
          <label htmlFor="title">Titulo do Filme</label>
          <input
            id="title"
            type="text"
            placeholder="Digite o título do filme..."
            value={filters.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="search-input"
            required
          />
        </div>
        
        <div className="input-wrapper">
          <label htmlFor="year">Ano</label>
          <input
            id="year"
            type="text"
            placeholder="Ex: 2023"
            value={filters.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className="year-input"
          />
        </div>
        
        <div className="select-wrapper">
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="type-select"
          >
            <option value="">Todos</option>
            <option value="movie">Filmes</option>
            <option value="series">Séries</option>
          </select>
        </div>
        
        <div className="button-group">
          <button type="submit" disabled={loading} className="search-button">
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Buscando...
              </>
            ) : (
              'Buscar'
            )}
          </button>
          
          {hasFilters && (
            <button 
              type="button" 
              onClick={handleClear} 
              className="clear-button"
              disabled={loading}
            >
              Limpar
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
