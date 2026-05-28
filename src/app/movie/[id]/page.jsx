"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Searchbar from "@/app/components/searchBar";

const moviesURL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
// Variáveis de ambiente para a URL da API, chave de API e URL base para imagens, garantindo que as informações sensíveis não sejam expostas no código-fonte

function joinUrl(base, path) {
  if (!base) return "";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path}`;
} // Função auxiliar para garantir que a URL seja formada corretamente, adicionando uma barra entre o base e o path se necessário

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para armazenar os detalhes do filme, status de carregamento e mensagens de erro

  useEffect(() => {
    if (!id) return;

    const getMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${joinUrl(moviesURL, id)}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error("Não foi possível carregar os dados do filme.");
        } // Verifica se a resposta foi bem-sucedida, caso contrário lança um erro
        const data = await response.json();
        setMovie(data); // Atualiza estado com os dados do filme
      } catch (err) {
        console.error("Erro ao buscar filme:", err);
        setError("Erro ao carregar os detalhes do filme. Tente novamente.");
      } finally {
        setLoading(false);
      } // Garante que o estado de loading seja atualizado mesmo em caso de erro
    };

    getMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Searchbar />
        <div className="text-white font-bold text-md line-clamp-2 mt-2">Carregando detalhes do filme...</div>
      </div>
    );
  } // Exibe mensagem de carregamento enquanto os dados estão sendo buscados

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Searchbar />
        <div className="text-white font-bold text-md line-clamp-2 mt-2">{error}</div>
      </div>
    );
  } // Exibe mensagem de erro caso haja um problema ao buscar os dados do filme

  return (
    <div className="bg-black min-h-screen text-white">
      <Searchbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="movie-details flex flex-col lg:flex-row gap-8">
          <img
            src={movie.poster_path ? joinUrl(imageUrl, movie.poster_path) : "/placeholder.png"}
            alt={movie.title}
            className="w-full lg:w-1/3 h-auto rounded-lg shadow-lg"
          /> {/* Exibe a imagem do pôster do filme ou um placeholder caso não haja imagem disponível */}

          <div className="flex-1 space-y-4">
            <p className="text-white font-bold text-md line-clamp-2 mt-2">Lançamento: {movie.release_date}</p>
            <p className="text-white font-bold text-md line-clamp-2 mt-2">
              Avaliação: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
            </p>
            <p className="text-base leading-relaxed">{movie.overview}</p> {/* Exibe a sinopse do filme */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Gênero:</span>{" "}
                {movie.genres?.map((genre) => genre.name).join(", ") || "—"} {/* Exibe os gêneros do filme ou um traço caso não haja gêneros disponíveis */}
              </div>
              <div>
                <span className="font-semibold">Duração:</span>{" "}
                {movie.runtime ? `${movie.runtime} min` : "—"} {/* Exibe a duração do filme ou um traço caso não haja informação disponível */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
