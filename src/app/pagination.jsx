import React from 'react';

const MAX_PAGE_BUTTONS = 9; // Número máximo de botões de página a serem exibidos
const MAX_LEFT = (MAX_PAGE_BUTTONS - 1) / 2; // Número máximo de botões à esquerda da página atual

// Componente de paginação para navegação entre páginas de resultados
const Pagination = ({ page, totalPages, onPageChange }) => {
    const current = Math.min(Math.max(page, 1), totalPages);
    const first = Math.max(current - MAX_LEFT, 1);
    const last = Math.min(first + MAX_PAGE_BUTTONS - 1, totalPages);
    const pages = Array.from({ length: last - first + 1 }, (_, index) => first + index);

    // Renderiza os botões de paginação, incluindo "Anterior", os números das páginas e "Próxima". 
    return (
        <nav className="flex justify-center mt-6" aria-label="Navegação de páginas">
            <ul className="pagination flex flex-wrap justify-center gap-2">
                <li>
                    <button
                        className="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 hover:bg-gray-700 disabled:opacity-50"
                        onClick={() => onPageChange(current - 1)}
                        disabled={current === 1}
                        aria-label="Página anterior"
                    >
                        Anterior
                    </button>
                </li>
                {pages.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            className={`px-3 py-1 rounded border border-gray-700 ${current === pageNumber ? 'bg-purple-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            onClick={() => onPageChange(pageNumber)}
                            disabled={current === pageNumber}
                            aria-current={current === pageNumber ? 'page' : undefined}
                            aria-label={`Página ${pageNumber}`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 hover:bg-gray-700 disabled:opacity-50"
                        onClick={() => onPageChange(current + 1)}
                        disabled={current === totalPages}
                        aria-label="Próxima página"
                    >
                        Próxima
                    </button>
                </li>
            </ul>
        </nav>
    );
};
    
export default Pagination;