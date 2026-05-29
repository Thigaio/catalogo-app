"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 2,
        cacheTime: 1000 * 60 * 5, 
      },
    },
  }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
} // Componente Providers que encapsula o QueryClientProvider do React Query, permitindo que o gerenciamento de estado e cache de dados assíncronos esteja disponível em toda a aplicação.