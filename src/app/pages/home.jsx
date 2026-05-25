"use client";

import { useState, useEffect } from "react"

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {topMovies && topMovies.map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                    {movie.poster_path && (
                        <img 
                            src={`$${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`} 
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                    )}
                    <div className="p-3">
                        <h3 className="text-purple-500 font-bold text-sm line-clamp-2">{movie.title}</h3>
                        <p className="text-gray-400 text-xs">{movie.release_date}</p>
                        <p className="text-gray-300 text-xs mt-1">⭐ {movie.vote_average}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home
