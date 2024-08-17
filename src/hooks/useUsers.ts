"use client";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fisioFetcher } from "./Apis";

export function useUsers() {
  const {
    data: users,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["users"],

    queryFn: () =>
      fisioFetcher<User[]>({
        url: "/users",
        method: "GET",
      }),
  });

  return {
    users: users,
    isLoading,
    isError,
    refetch,
  };
}

export async function deleteUser(userId: string, refetch: () => void) {
  return fisioFetcher({
    url: `/users/${userId}`,
    method: "DELETE",
    callback: () => {
      refetch();
    },
  });
}
