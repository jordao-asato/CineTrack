// src/api/tmdbApi.js
// Cliente único para a API do TMDB (The Movie Database).
//
// A chave da API NÃO fica mais hardcoded no código. Ela é lida de uma
// variável de ambiente (EXPO_PUBLIC_TMDB_API_KEY), configurada no arquivo
// .env na raiz do projeto. Veja o arquivo .env.example para o formato.

import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.warn(
    'TMDB API key não encontrada. Defina EXPO_PUBLIC_TMDB_API_KEY no arquivo .env'
  );
}

// Instância do axios já configurada com a base URL e a chave da API,
// para evitar repetir esses parâmetros em cada chamada.
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

const tmdbApi = {
  // Busca filmes com base em uma consulta (query)
  searchMovies: async (query) => {
    try {
      const response = await tmdbClient.get('/search/movie', {
        params: { query },
      });
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return [];
    }
  },

  // Busca os filmes populares
  getPopularMovies: async (page = 1) => {
    try {
      const response = await tmdbClient.get('/movie/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      return [];
    }
  },

  // Busca detalhes de um filme específico pelo ID
  getMovieDetails: async (id) => {
    try {
      const response = await tmdbClient.get(`/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
      return null;
    }
  },
};

export default tmdbApi;

// Exporta também a função isolada, para quem prefere o estilo de
// importação nomeada (compatibilidade com o antigo tmdbService.js)
export const getPopularMovies = tmdbApi.getPopularMovies;
