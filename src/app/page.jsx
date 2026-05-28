"use client";

import Searchbar from "./components/searchBar";
import Home from "./pages/home";

// Componente raiz que renderiza layout principal da aplicação
function App() {
    return (
        <div className="App" style={{ fontFamily: "helvetica" }}>
            {/* Navbar: Barra de navegação com busca */}
            <Searchbar />
            
            <main className="bg-black min-h-screen">
                {/* Home: Componente que exibe grid de filmes da TMDB */}
                <Home />
            </main>
        </div>
    );
}

export default App;