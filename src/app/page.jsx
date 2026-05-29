"use client";

import { Suspense } from "react";
import Searchbar from "./components/search";
import Home from "./pages/home";

export default function App() {
    return (
        <div className="App" style={{ fontFamily: "helvetica" }}>
            {/* Navbar: Barra de navegação com busca */}
            <Searchbar />
            
            <main className="bg-black min-h-screen">
                {/* Home: Componente que exibe grid de filmes da TMDB */}
                <Suspense fallback={<div className="text-white p-4">Carregando...</div>}>
                    <Home />
                </Suspense>
            </main>
        </div>
    );
}