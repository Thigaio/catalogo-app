"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
} // Componente Providers que encapsula o QueryClientProvider do React Query, permitindo que o gerenciamento de estado e cache de dados assíncronos esteja disponível em toda a aplicação.