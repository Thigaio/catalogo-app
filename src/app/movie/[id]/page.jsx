"use client";

import { useQuery } from "@tanstack/react-query"; // Importa o hook useQuery para gerenciamento de dados assíncronos
import { useParams } from "next/navigation"; // Importa o hook useParams para acessar os parâmetros da rota (neste caso, o ID do filme)
import Searchbar from "@/app/components/search"; // Importa o componente Searchbar para permitir que os usuários façam buscas de filmes
import QueryStatus from "@/app/components/ui/queryStatus"; // Importa componente de status de query para loading/erro
import { getMovieById } from "@/lib/tmdb"; // Importa a função getMovieById para buscar os detalhes de um filme específico usando a API do TMDB

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "https://image.tmdb.org/t/p/w500"; // Obtém a URL base para as imagens dos filmes a partir das variáveis de ambiente, com fallback

function joinUrl(base, path) {
  if (!base) return "";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path}`;
} // Função auxiliar para construir a URL completa da imagem, garantindo que haja uma barra entre a base e o caminho da imagem

export default function MovieDetailsPage() {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  }); // Usa o hook useQuery para buscar os detalhes do filme com base no ID obtido dos parâmetros da rota. 

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Searchbar />
        <div className="text-white font-bold text-md line-clamp-2 mt-2">Carregando detalhes do filme...</div>
      </div>
    );
  } // Se os dados ainda estiverem sendo carregados, exibe uma mensagem de carregamento junto com a barra de pesquisa.

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Searchbar />
        <QueryStatus error={error} loadingText="Carregando detalhes do filme..." errorText="Erro ao carregar os detalhes do filme:" />
      </div>
    );
  } // Se ocorrer um erro ao buscar os dados, exibe uma mensagem de erro junto com a barra de pesquisa.

  return (
    <div className="bg-black min-h-screen text-white">
      <Searchbar /> {/* Exibe a barra de pesquisa no topo da página, permitindo que os usuários façam novas buscas mesmo enquanto visualizam os detalhes de um filme específico */}
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="movie-details flex flex-col lg:flex-row gap-8">
          <img
            src={movie.poster_path ? joinUrl(imageUrl, movie.poster_path) : "/placeholder.png"}
            alt={movie.title}
            className="w-full lg:w-1/3 h-auto rounded-lg shadow-lg"
          /> {/* Exibe a imagem do pôster do filme. Se o caminho do pôster estiver disponível, constrói a URL completa usando a função joinUrl; caso contrário, exibe uma imagem de placeholder. */}

          <div className="flex-1 space-y-4">
            <p className="text-white font-bold text-md line-clamp-2 mt-2">Lançamento: {movie.release_date ? movie.release_date.split("-").reverse().join("/") : "N/A"}</p>
            <p className="text-white font-bold text-md line-clamp-2 mt-2">
              Avaliação: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
            </p>
            <p className="text-base leading-relaxed">{movie.overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Gênero:</span>{" "}
                {movie.genres?.map((genre) => genre.name).join(", ") || "—"}
              </div>
              <div>
                <span className="font-semibold">Duração:</span>{" "}
                {movie.runtime ? `${movie.runtime} min` : "—"}
              </div>
            </div>
          </div> {/* Exibe os detalhes do filme, incluindo título, data de lançamento, avaliação, sinopse, gêneros e duração.*/}
        </div>
      </main>
    </div>
  );
}
