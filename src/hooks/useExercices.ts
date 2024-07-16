import { Exercise, ExerciseCategoryEnum, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fisioFetcher } from "./Apis";
export const useExercises = ({
  search,
  category,
}: {
  search?: string;
  category?: ExerciseCategoryEnum;
}) => {
  const {
    data: exercises,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["exercises", search, category],
    queryFn: () => getExercises(),
    staleTime: 1000 * 60 * 10,
  });

  const getExercises = async (): Promise<Exercise[]> => {
    const searchParams = new URLSearchParams();

    if (search) {
      searchParams.append("search", search);
    }

    if (category) {
      searchParams.append("category", category);
    }

    const response = await fisioFetcher({
      url: `/exercises?${searchParams.toString()}`,
      method: "GET",
    });

    if (response) {
      return response;
    }

    return [];
  };

  const createExercise = async (
    exercise: Prisma.ExerciseUncheckedCreateInput
  ) => {
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

  const updateExercise = async (
    exercise: Prisma.ExerciseUncheckedUpdateInput
  ) => {
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
    createExercise,
    updateExercise,
    deleteExercise,
    refetch,
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
