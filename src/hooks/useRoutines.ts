import { Routine } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fisioFetcher } from "./Apis";

export const useRoutines = () => {
  const getRoutines = async (userid: string) => {
    return await fisioFetcher({
      url: `/ /${userid}`,
      method: "GET",
    });
  };

  const getRoutine = async (userid: string, id: string) => {
    return await fisioFetcher({
      url: `/users/${userid}/routines/${id}`,
      method: "GET",
    });
  };

  const updateRoutine = async (userId: string, routine: Partial<Routine>) => {
    return await fisioFetcher({
      url: `/users/${userId}/routines`,
      method: "POST",
      data: routine,
      callback: () => {
        toast.success("Rotina atualizada com sucesso");
      },
    });
  };

  const deleteRoutine = async (userId: string, routineId: string) => {
    return await fisioFetcher({
      url: `/users/${userId}/routines/${routineId}`,
      method: "DELETE",
      callback: () => {
        toast.success("Rotina removida com sucesso");
      },
    });
  };

  return {
    getRoutine,
    getRoutines,
    updateRoutine,
    deleteRoutine,
  };
};

export const usePatientRoutines = () => {
  const {
    data: routines,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["routines"],
    queryFn: () => getPatientRoutines(),
  });

  const getPatientRoutines = async (): Promise<Routine[]> => {
    return await fisioFetcher({
      url: `/users/routines`,
      method: "GET",
    });
  };

  return {
    routines,
    isLoading,
    refetch,
  };
};
