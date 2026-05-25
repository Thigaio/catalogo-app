"use client";

import "./globals.css" // Importa estilos globais com Tailwind
import Navbar from "./components/navbar";
import Home from "./pages/home";

// Componente raiz que renderiza layout principal da aplicação
export default function App() {
    return (
        <div className="App" style={{ fontFamily: "helvetica" }}>
            {/* Navbar: Barra de navegação com busca */}S
            <Navbar />
            
            <main className="bg-black min-h-screen">
                {/* Home: Componente que exibe grid de filmes da TMDB */}
                <Home />
            </main>
        </div>
    );
}
