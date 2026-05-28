import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Catalogo de Filmes",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} // Componente de layout raiz do aplicativo, que define a estrutura HTML básica e inclui os provedores de contexto necessários para o funcionamento do aplicativo. Ele também importa as fontes do Google e aplica classes CSS para estilização global. O conteúdo das páginas será renderizado dentro do componente Providers, garantindo que o gerenciamento de estado e outras funcionalidades estejam disponíveis em toda a aplicação.
