"use client";
import { ptBR } from "date-fns/locale";
import "react-toastify/dist/ReactToastify.css";
setDefaultOptions({ locale: ptBR });

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { ToastContainer } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" />
      {children}{" "}
    </QueryClientProvider>
  );
};
