const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "244472d31ff895a903c2344dc2ddcbbd"; // Obtém a chave da API do TMDB a partir de uma variável de ambiente.
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL || "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error("A variável NEXT_PUBLIC_TMDB_API_KEY não está definida.");
} // Verifica se a variável de ambiente para a chave da API do TMDB está definida. Se não estiver, lança um erro.

function buildUrl(path, params = {}) {
  const normalizedBase = BASE_URL.replace(/\/+$/, "");
  let normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedBase.endsWith("/movie") && normalizedPath.startsWith("/movie")) {
    normalizedPath = normalizedPath.replace(/^\/movie/, "");
  } // Normaliza a URL base e o caminho da API para evitar duplicação de segmentos, especialmente para endpoints relacionados a filmes.

  const url = new URL(`${normalizedBase}${normalizedPath}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "pt-BR");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }); // Adiciona os parâmetros da consulta à URL.

  return url.toString();
}

async function fetchTmdb(path, params = {}) {
  const response = await fetch(buildUrl(path, params));

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do TMDB");
  }

  return response.json();
} // Função auxiliar para construir a URL completa da API do TMDB com os parâmetros necessários e realizar a requisição.

export function getTopRatedMovies(page = 1) {
  return fetchTmdb("/movie/top_rated", { page });
} // Função para buscar os filmes mais bem avaliados usando o endpoint /movie/top_rated da API do TMDB.

export function searchMovies(query, page = 1) {
  if (!query) return Promise.resolve({ results: [], page: 1, total_pages: 1, total_results: 0 });
  return fetchTmdb("/search/movie", { query, page });
} // Função para buscar filmes com base em um termo de busca, usando o endpoint /search/movie da API do TMDB.
export function getMovieById(id) {
  return fetchTmdb(`/movie/${id}`);
} // Função para buscar os detalhes de um filme específico usando o endpoint /movie/{movie_id} da API do TMDB, onde {movie_id} é o ID do filme a ser buscado.
