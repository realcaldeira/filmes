import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [filters, setFilters] = useState<SearchFilters>({ title: '', year: '', type: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filters.title.trim()) onSearch(filters);
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => setFilters({ title: '', year: '', type: '' });
  const hasFilters = Boolean(filters.title || filters.year || filters.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-white to-slate-50 rounded-2xl shadow-lg p-8"
    >
      <motion.form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Title Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 250 }}
            className="flex flex-col"
          >
            <label htmlFor="title" className="mb-1 font-medium text-slate-800">
              Título do Filme
            </label>
            <input
              id="title"
              type="text"
              placeholder="Digite o título..."
              value={filters.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('title', e.target.value)
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </motion.div>

          {/* Year Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 250 }}
            className="flex flex-col"
          >
            <label htmlFor="year" className="mb-1 font-medium text-slate-800">
              Ano
            </label>
            <input
              id="year"
              type="number"
              placeholder="Ex: 2024"
              value={filters.year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('year', e.target.value)
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          {/* Type Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 250 }}
            className="flex flex-col"
          >
            <label htmlFor="type" className="mb-1 font-medium text-slate-800">
              Tipo
            </label>
            <select
              id="type"
              value={filters.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange('type', e.target.value)
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Todos</option>
              <option value="movie">Filmes</option>
              <option value="series">Séries</option>
            </select>
          </motion.div>
        </div>

        <motion.div className="flex flex-wrap justify-center gap-4 mt-6">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </motion.button>

          {hasFilters && (
            <motion.button
              type="button"
              onClick={handleClear}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-3 bg-white text-slate-700 rounded-md font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 transition"
            >
              Limpar
            </motion.button>
          )}
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default SearchForm;
