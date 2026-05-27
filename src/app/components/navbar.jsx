"use client";
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!search) return;

        router.push(`/?q=${search}`);
        setSearch("");
    }; 

    return (
        <nav className="bg-black border-b border-purple-500 p-4 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
                <h2 className="text-lg md:text-2xl font-bold">
                    <Link href="/" className="text-purple-500 hover:text-purple-800">
                        Catálogo
                    </Link> {/* Link para a página inicial */}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-purple-500 flex-1 md:flex-none"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    /> {/* Campo de busca controlado */}
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-purple-500 text-black font-bold rounded hover:bg-purple-800 transition w-full md:w-auto"
                    >
                        Buscar
                    </button> {/* Botão de submit para a busca */}
                </form>
            </div>
        </nav>
    );
};

export default Navbar;