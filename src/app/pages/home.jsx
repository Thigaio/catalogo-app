"use client";

import { useState, useEffect } from "react"
import MovieCard from "../components/movieCard"

// Endpoints da API TMDB carregados das variáveis de ambiente
const moviesURL = process.env.NEXT_PUBLIC_TMDB_API_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setTopMovies(data.results); // Atualiza estado com array de filmes
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };

    useEffect(() => {
        const topRatedUrl = `${moviesURL}/top_rated?api_key=${apiKey}`;
        getTopRatedMovies(topRatedUrl);
    }, []); // Dependency array vazio = executa só na montagem

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-purple-500 p-4">Top Filmes</h2>
            <div className="movies-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 pb-4 w-full">
                {topMovies.length === 0 && <p className="text-purple-500 font-bold text-sm line-clamp-2">Carregando filmes...</p>} 
                {topMovies.length > 0 && 
                    topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)} {/*Renderização condicional: mostra mensagem de carregamento ou lista de filmes */}
             </div>
        </div>
    );
}

export default Home
