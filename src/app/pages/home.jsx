"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "../components/movieCard";

const moviesURL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const searchUrl = process.env.NEXT_PUBLIC_SEARCH_API;

function HomeContent() {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("Top Filmes");
    const [loading, setLoading] = useState(true);
    
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("q");

    const getMovies = async (url, titleText) => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results || []);
            setTitle(titleText);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        } finally {
            setLoading(false);
        } {/* Garante que o estado de loading seja atualizado mesmo em caso de erro */}
    }; 

    useEffect(() => {
        if (searchTerm && searchUrl) {
            const url = `${searchUrl}?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
            getMovies(url, `Resultados para: "${searchTerm}"`);
        } else {
            const topRatedUrl = `${moviesURL}/top_rated?api_key=${apiKey}`;
            getMovies(topRatedUrl, "Top Filmes");
        } {/* O useEffect é acionado sempre que o searchTerm muda, buscando filmes de acordo com a presença ou ausência do termo de busca */}
    }, [searchTerm]); 

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-white p-4">{title}</h2>
            <div className="movies-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 pb-4 w-full">
                {loading && (
                    <p className="text-white font-bold text-sm line-clamp-2">Carregando...</p>
                )} 
                {!loading && movies.length === 0 && (
                    <p className="text-white font-bold text-sm line-clamp-2">Nenhum filme encontrado.</p>
                )}
                {!loading && movies.length > 0 &&
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))} {/* Exibe mensagens de carregamento, ausência de resultados ou a lista de filmes conforme o estado atual */}
            </div>
        </div>
    ); 
}

function Home() {
    return (
        <Suspense fallback={<div className="text-white p-4">Carregando...</div>}>
            <HomeContent />
        </Suspense>
    );
} {/* O componente Home é envolvido em Suspense para exibir um fallback enquanto o conteúdo é carregados */}

export default Home;