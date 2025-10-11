"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { AuthProvider } from "@/contexts/auth";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import { CssBaseline } from "@mui/material";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Criar QueryClient dentro do componente para evitar problemas de SSR
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo que os dados ficam "fresh" (5 minutos)
            staleTime: 5 * 60 * 1000,
            // Tempo que os dados ficam no cache (10 minutos)
            gcTime: 10 * 60 * 1000,
            // Retry em caso de erro
            retry: 1,
            // Refetch quando a janela ganha foco
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry para mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <CssBaseline />
        <AuthProvider>
          {children}

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#4caf50",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#f44336",
                  secondary: "#fff",
                },
              },
            }}
          />

          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </AuthProvider>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}
