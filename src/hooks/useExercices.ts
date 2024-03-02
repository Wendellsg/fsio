import { Exercise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fisioFetcher } from "./Apis";
export const useExercises = () => {
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
    staleTime: 1000 * 60 * 10,
  });

  const getExercises = async (): Promise<Exercise[]> => {
    const response = await fisioFetcher({
      url: "/exercises",
      method: "GET",
    });

    if (response) {
      return response;
    }

    return [];
  };

  const searchExercises = async (search: {
    category?: string;
    name?: string;
  }) => {
    const response = await fisioFetcher({
      url: `/exercises?category=${search.category}&name=${search.name}`,
      method: "GET",
    });

    if (!response) return;
    return response;
  };

  const createExercise = async (exercise: Exercise) => {
    await fisioFetcher({
      url: "/exercises",
      method: "POST",
      data: exercise,
      callback: () => {
        getExercises();
        toast.success("Exercício criado com sucesso!");
      },
    });
  };

  const updateExercise = async (exercise: Exercise) => {
    await fisioFetcher({
      url: `/exercises/${exercise.id}`,
      method: "PATCH",
      data: exercise,
      callback: () => {
        getExercises();
        toast.success("Exercício criado com sucesso!");
      },
    });
  };

  const deleteExercise = async (id: string) => {
    await fisioFetcher({
      url: `/exercises/${id}`,
      method: "DELETE",
      callback: () => {
        getExercises();
        toast.success("Exercício excluído com sucesso!");
      },
    });
  };

  return {
    exercises,
    isLoading,
    getExercises,
    searchExercises,
    createExercise,
    updateExercise,
    deleteExercise,
  };
};

export const useExercise = (id: string) => {
  const { data: exercise, isLoading } = useQuery({
    queryFn: () => getExercise(id),
    queryKey: ["exercise", `${id}`],
    staleTime: Infinity,
    enabled: !!id,
  });

  const getExercise = async (id: string): Promise<Exercise> => {
    const response = await fisioFetcher({
      url: `/exercises/${id}`,
      method: "GET",
    });
    return response;
  };

  return {
    exercise,
    isLoading,
  };
};
