"use client";
import { toast } from "sonner";
import { fisioFetcher } from "../Apis";

import { UserUpdateData } from "@/lib/zod-schemas";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  const {
    data: userData,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryFn: async () =>
      await fisioFetcher<Partial<User>>({
        url: "/auth/me",
        method: "GET",
        checkAuth: true,
      }),

    queryKey: ["userData"],
    staleTime: 1000 * 60 * 10,
  });

  const updateUserProfileData = async (data: UserUpdateData) => {
    await fisioFetcher({
      url: "/users",
      method: "PATCH",
      data,
      callback: () => {
        refetch();
        toast.success("Dados atualizados com sucesso");
      },
    });
  };

  const addFavoriteExercise = async (exerciseId: string) => {
    await fisioFetcher({
      url: "/users/favorite-exercises",
      method: "POST",
      data: {
        exerciseId,
      },
      callback: () => {
        refetch();
        toast.success("Exercício adicionado aos favoritos");
      },
    });
  };

  const removeFavoriteExercise = async (exerciseId: string) => {
    await fisioFetcher({
      url: `/users/favorite-exercises/${exerciseId}`,
      method: "DELETE",

      callback: () => {
        refetch();
        toast.success("Exercício removido dos favoritos");
      },
    });
  };

  return {
    userData,
    isLoading: isLoading && !isError,
    refetch,
    updateUserProfileData,
    addFavoriteExercise,
    removeFavoriteExercise,
  };
};
