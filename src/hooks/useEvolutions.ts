import { Evolution } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fisioFetcher } from "./Apis";

export const useEvolutions = () => {
  const {
    data: evolutions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["evolutions"],
    queryFn: () => getEvolution(),
    staleTime: 1000 * 60 * 10,
  });

  const getEvolution = async (): Promise<Evolution[]> => {
    return await fisioFetcher({
      url: `/evolutions/doctor`,
      method: "GET",
    });
  };

  const createEvolution = async (data: Partial<Evolution>) => {
    await fisioFetcher({
      url: `/evolutions`,
      method: "POST",
      data,
      callback: () => {
        refetch();
        toast.success("Agendamento criado com sucesso");
      },
    });
  };

  const updateEvolution = async (id: string, data: Partial<Evolution>) => {
    await fisioFetcher({
      url: `/evolutions/${id}`,
      method: "PATCH",
      data,
      callback: () => {
        refetch();
        toast.success("Agendamento atualizado com sucesso");
      },
    });
  };

  const deleteEvolution = async (id: string) => {
    await fisioFetcher({
      url: `/evolutions/${id}`,
      method: "DELETE",
      callback: () => {
        refetch();
        toast.success("Agendamento removido com sucesso");
      },
    });
  };

  return {
    evolutions: evolutions || ([] as Evolution[]),
    isLoading,
    refetch,
    createEvolution,
    updateEvolution,
    deleteEvolution,
  };
};
