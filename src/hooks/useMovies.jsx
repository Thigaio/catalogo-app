import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies, searchMovies } from "@/lib/tmdb";

// Hook personalizado para buscar os filmes mais bem avaliados, usando React Query para gerenciamento de estado assíncrono.
export function useTopRatedMovies(page = 1, enabled = true) {
  return useQuery({
    queryKey: ["topRatedMovies", page],
    queryFn: () => getTopRatedMovies(page),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
}

// Hook personalizado para buscar filmes com base em um termo de busca e página, usando React Query para gerenciamento de estado assíncrono.
export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ["searchMovies", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: Boolean(query),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
}
