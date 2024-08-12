"use client";

import { Professional } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fisioFetcher } from "./Apis";

export function useProfessionalData() {
  const {
    data: professionalData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () =>
      await fisioFetcher<Professional>({
        url: "/professionals/me",
        method: "GET",
      }),

    queryKey: ["professionalData"],
    staleTime: 1000 * 60 * 10,
  });

  return {
    professionalData: professionalData as Professional,
    isLoading,
    refetch,
  };
}
