// Componente QueryStatus para exibir mensagens de status de carregamento, erro ou vazio de forma consistente em toda a aplicação.
export default function QueryStatus({ isLoading, error, empty, loadingText = "Carregando...", errorText = "Erro ao carregar filmes:", emptyText = "Nenhum filme encontrado." }) {
    if (isLoading) {
        return <p className="text-white font-bold text-sm line-clamp-2">{loadingText}</p>;
    }

    if (error) {
        return <p className="text-white font-bold text-sm line-clamp-2">{errorText} {error.message}</p>;
    }

    if (empty) {
        return <p className="text-white font-bold text-sm line-clamp-2">{emptyText}</p>;
    }

    return null;
}
