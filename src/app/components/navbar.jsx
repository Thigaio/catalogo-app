import React from 'react';
import Link from "next/link"; // Link do Next.js 

const Navbar = () => {
    return (
        <nav className="bg-black border-b border-purple-500 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                {/* Logo/Título com link para home */}
                <h2 className="text-2xl font-bold">
                    <Link href="/" className="hover:text-purple-800">
                        Catalogo de Filmes
                    </Link>
                </h2>
                {/* Form: Input + Botão de busca*/}
                <form className="flex gap-2">
                    {/* Input de Pesquisa*/}
                    <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-purple-500 "
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-purple-500 text-black font-bold rounded hover:bg-purple-800 transition"
                    >
                        Buscar
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;