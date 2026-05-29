"use client";
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import useDebounce from '../useDebounce';

const Searchbar = () => {
    const router = useRouter(); 
    const [displayValue, setDisplayValue] = useState(''); 
    // Função de busca com debounce
    const debouncedSearch = useDebounce((value) => { 
        if (value.trim()) {
            router.push(`/?q=${value}`);
        } else {
            router.push('/');
        }
    }, 500); 


    return (
        <nav className="bg-black border-b border-purple-500 p-4 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
                <h2 className="text-lg md:text-2xl font-bold">
                    <Link href="/" className="text-purple-500 hover:text-purple-800">
                        Catálogo
                    </Link> {/* Link para a página inicial */}
                </h2>
                <div className="w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-purple-500 w-full md:w-auto"
                        onChange={(e) => {
                            setDisplayValue(e.target.value); // Atualiza o valor exibido no input
                            debouncedSearch(e.target.value); // Chama a função de busca com debounce
                        }} 
                        value={displayValue} // Mantém o valor do input controlado pelo estado displayValue
                    />
                </div>
            </div>
        </nav>
    );
};

export default Searchbar;