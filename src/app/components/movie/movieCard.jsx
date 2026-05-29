import Link from "next/link"; // Link do Next.js 

const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL; // Variável de ambiente para URL de imagens
const yearDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.getFullYear();
}; // Função para extrair o ano de uma data, retornando "N/A" se a data for inválida

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-Card text-center">
            <img src={imgUrl + movie.poster_path} alt={movie.title} className="w-full h-auto rounded-lg" />{/* Exibe a imagem do filme usando a URL base e o caminho do poster */}
            <h2 className="text-white font-bold text-md line-clamp-2 mt-2">{movie.title}</h2> {/* Exibe título do filme com estilo*/}
            <p className="text-white font-bold text-md line-clamp-2 mt-1">{yearDate(movie.release_date)}</p> {/* Exibe ano de lançamento do filme */}
            {showLink && <Link href={`/movie/${movie.id}`} className="bg-purple-500 text-black font-bold text-md hover:bg-purple-800 block mt-2 border-2 transition">Detalhes</Link>} {/* Link para detalhes do filme*/}
        </div>
    );
}

export default MovieCard;
