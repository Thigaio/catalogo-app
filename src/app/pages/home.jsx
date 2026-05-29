"use client";

import { useSearchParams, useRouter } from "next/navigation"; // Importa o hook useSearchParams e useRouter para ler e atualizar query params.
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query"; // Importa useQueryClient para prefetch
import { useTopRatedMovies, useSearchMovies } from "@/hooks/useMovies"; // Hooks centralizados para queries
import MovieCard from "../components/movie"; // Importa o componente MovieCard para exibir os filmes em cartões.
import Pagination from "../pagination"; // Importa o componente de paginação.
import QueryStatus from "../components/ui/queryStatus"; // Importa componente de status de query para loading/erro/empty.
import { getTopRatedMovies, searchMovies } from "@/lib/tmdb"; // Importa as funções de busca do TMDB.

// Componente que exibe a página inicial com os filmes mais bem avaliados ou resultados de busca, dependendo dos query params.
function HomeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchTerm = searchParams.get("q") || "";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    const queryClient = useQueryClient();

    // Usa hooks centralizados para queries (encapsula chaves e opções)
    const searchQuery = useSearchMovies(searchTerm, currentPage);
    const topRatedQuery = useTopRatedMovies(currentPage, !searchTerm);
    const { data, isLoading, error } = searchTerm ? searchQuery : topRatedQuery;

    // Prefetch da próxima página para navegação mais rápida
    useEffect(() => {
        if (!data) return;
        const nextPage = currentPage + 1;
        const totalPages = data?.total_pages || 1;
        if (nextPage > totalPages) return;

        const key = searchTerm ? ["searchMovies", searchTerm, nextPage] : ["topRatedMovies", nextPage];
        queryClient.prefetchQuery({
            queryKey: key,
            queryFn: () => (searchTerm ? searchMovies(searchTerm, nextPage) : getTopRatedMovies(nextPage)),
        });
    }, [data, currentPage, queryClient, searchTerm]);

    const movies = data?.results || [];
    const title = searchTerm ? `Resultados para: "${searchTerm}"` : "Top Filmes";
    const totalPages = data?.total_pages || 1;

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage === currentPage || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`/?${params.toString()}`);
    }; // Função para lidar com a mudança de página na paginação. 

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-white p-4">{title}</h2>
            <div className="movies-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 pb-4 w-full">
                <QueryStatus
                    isLoading={isLoading}
                    error={error}
                    empty={!isLoading && !error && movies.length === 0}
                />

                {!isLoading && !error && movies.length > 0 &&
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
            </div>
            {totalPages > 1 && (
                <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    ); // Exibe o título da seção baseado na busca ou nos filmes mais bem avaliados e uma grade de cartões de filmes. 
}

export default function Home() {
    return <HomeContent />;
} // Componente principal da página inicial, que renderiza o conteúdo da home usando o componente HomeContent. 