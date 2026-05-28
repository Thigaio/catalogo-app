"use client";

import { useSearchParams } from "next/navigation"; // Importa o hook useSearchParams para acessar os parâmetros de busca da URL, permitindo que a página reaja às mudanças na query de busca.
import { useQuery } from "@tanstack/react-query"; // Importa o hook useQuery para gerenciamento de dados assíncronos, facilitando a busca e o cache dos dados dos filmes.
import MovieCard from "../components/movieCard"; // Importa o componente MovieCard para exibir as informações de cada filme em um formato de cartão.
import { getTopRatedMovies, searchMovies } from "@/lib/tmdb"; // Importa as funções getTopRatedMovies e searchMovies para buscar os filmes mais bem avaliados ou os resultados de uma busca específica usando a API do TMDB.

function HomeContent() {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("q") || "";

    const { data, isLoading, error } = useQuery({
        queryKey: searchTerm ? ["searchMovies", searchTerm] : ["topRatedMovies"],
        queryFn: () => (searchTerm ? searchMovies(searchTerm) : getTopRatedMovies()),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2,
    }); // Usa o hook useQuery para buscar os filmes com base na query de busca. Se houver um termo de busca, a consulta buscará os filmes correspondentes; caso contrário, buscará os filmes mais bem avaliados. A opção keepPreviousData mantém os dados anteriores enquanto a nova consulta está sendo feita, e staleTime define o tempo em que os dados são considerados frescos.

    const movies = data?.results || [];
    const title = searchTerm ? `Resultados para: "${searchTerm}"` : "Top Filmes";

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-white p-4">{title}</h2>
            <div className="movies-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 pb-4 w-full">
                {isLoading && (
                    <p className="text-white font-bold text-sm line-clamp-2">Carregando...</p>
                )}
                {!isLoading && error && (
                    <p className="text-white font-bold text-sm line-clamp-2">Erro ao carregar filmes: {error.message}</p>
                )}
                {!isLoading && !error && movies.length === 0 && (
                    <p className="text-white font-bold text-sm line-clamp-2">Nenhum filme encontrado.</p>
                )}
                {!isLoading && !error && movies.length > 0 &&
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
            </div>
        </div>
    ); // Exibe o título da seção (baseado na busca ou nos filmes mais bem avaliados) e uma grade de cartões de filmes. Durante o carregamento, exibe uma mensagem de carregamento; se ocorrer um erro, exibe a mensagem de erro; se não houver filmes encontrados, exibe uma mensagem indicando isso; caso contrário, mapeia os filmes para componentes MovieCard para exibição.
}

export default function Home() {
    return <HomeContent />;
} // Componente principal da página inicial, que renderiza o conteúdo da home usando o componente HomeContent. Isso permite que a lógica de busca e exibição dos filmes seja encapsulada em um componente separado, mantendo a estrutura do aplicativo organizada.