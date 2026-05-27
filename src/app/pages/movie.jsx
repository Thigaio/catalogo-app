import { useState, useEffect } from "react"
import { useParams } from "next/navigation";

import movieCard from "../components/movieCard";

const moviesURL = process.env.NEXT_PUBLIC_TMDB_API_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data); // Atualiza estado com os dados do filme
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };
    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`;
        getMovie(movieUrl);
    }, []); 

    return (
        <div>
            {movie && <>
                <h1 className="text-3xl font-bold mb-4 text-white p-4">{movie.title}</h1>
                <div className="movie-details flex flex-col md:flex-row gap-8 px-4 pb-4 w-full">
                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + movie.poster_path} alt={movie.title} className="w-full md:w-1/3 h-auto rounded-lg" />
                </div>
                <p className="text-white font-bold text-md line-clamp-2 mt-1 px-4">Sinopse: {movie.overview}</p>
                <p className="text-white font-bold text-md line-clamp-2 mt-1 px-4">Lançamento: {movie.release_date}</p>
            </>}
        </div>
    )
}

export default Movie