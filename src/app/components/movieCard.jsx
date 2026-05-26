import Link from "next/link"; // Link do Next.js 

const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL; // Variável de ambiente para URL de imagens

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-Card text-center">
            <img src={imgUrl + movie.poster_path} alt={movie.title} className="w-full h-auto rounded-lg" />
            <h2 className="text-white font-bold text-md line-clamp-2 mt-2">{movie.title}</h2> {/* Exibe título do filme com estilo*/}
            <p className="text-white font-bold text-md line-clamp-2 mt-1">* {movie.vote_average.toFixed(1)}</p> {/* Exibe nota do filme com uma casa decimal */}
            {showLink && <Link href={`/movie/${movie.id}`} className="text-purple-500 font-bold text-md hover:text-purple-800 block mt-2">Detalhes</Link>} {/* Link para detalhes do filme*/}
        </div>
    );
}

export default MovieCard;