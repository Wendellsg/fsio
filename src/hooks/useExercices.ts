import type { Exercise, ExerciseCategoryEnum, Prisma } from "@prisma/client";
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

  const getExercises = async () => {
    const searchParams = new URLSearchParams();

    if (search) {
      searchParams.append("search", search);
    }

    if (category) {
      searchParams.append("category", category);
    }

    const response = await fisioFetcher<Exercise[]>({
      url: `/exercises?${searchParams.toString()}`,
      method: "GET",
    });

    if (response) {
      return response;
    }

    return [];
  };

  return {
    exercises,
    isLoading,
    getExercises,
    refetch,
  };
};

export const createExercise = async (
  exercise: Prisma.ExerciseUncheckedCreateInput,
  refetch: () => void
) => {
  await fisioFetcher({
    url: "/exercises",
    method: "POST",
    data: exercise,
    callback: () => {
      refetch();
      toast.success("Exercício criado com sucesso!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};

export const updateExercise = async (
  exercise: Prisma.ExerciseUncheckedUpdateInput,
  refetch: () => void
) => {
  await fisioFetcher({
    url: `/exercises/${exercise.id}`,
    method: "PATCH",
    data: exercise,
    callback: () => {
      refetch();
      toast.success("Exercício criado com sucesso!");
    },
  });
};

export const deleteExercise = async (id: string, refetch: () => void) => {
  await fisioFetcher({
    url: `/exercises/${id}`,
    method: "DELETE",
    callback: () => {
      refetch();
      toast.success("Exercício excluído com sucesso!");
    },
  });
};

export const useExercise = (id: string) => {
  const { data: exercise, isLoading } = useQuery({
    queryFn: () => getExercise(id),
    queryKey: ["exercise", `${id}`],
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!id,
  });

  const getExercise = async (id: string) => {
    const response = await fisioFetcher<Exercise>({
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
