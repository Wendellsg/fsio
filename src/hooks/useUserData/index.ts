"use client";
import { toast } from "react-toastify";
import { fisioFetcher } from "../Apis";

import { UserUpdateData } from "@/lib/zod-schemas";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async (): Promise<User | null> => {
      return await fisioFetcher({
        url: "/auth/me",
        method: "GET",
      });
    },
    queryKey: ["useData"],
    staleTime: 1000 * 60 * 10,
  });

  const updateUserProfileImage = async (url: string) => {
    await fisioFetcher({
      url: "/users/image",
      method: "PATCH",
      data: {
        profileImage: url,
      },
      callback: () => {
        refetch();
        toast.success("Imagem atualizada com sucesso");
      },
    });
  };

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
    isLoading,
    refetch,
    updateUserProfileImage,
    updateUserProfileData,
    addFavoriteExercise,
    removeFavoriteExercise,
  };
};
