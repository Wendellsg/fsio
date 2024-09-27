import type { Activity, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fisioFetcher } from "./Apis";

export function useActivities(routineId: string) {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities", routineId],
    queryFn: async () => {
      return await fisioFetcher<Activity[]>({
        url: `/activities?routineId=${routineId}`,
        method: "GET",
      });
    },
  });

  return {
    activities,
    isLoading,
  };
}

export async function createActivity(
  activity: Prisma.ActivityUncheckedCreateInput
) {
  return await fisioFetcher({
    url: "/activities",
    method: "POST",
    data: activity,
    callback: () => {
      toast.success("Atividade criada com sucesso");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}

export async function deleteActivity(activityId: string) {
  return await fisioFetcher({
    url: `/activities/${activityId}`,
    method: "DELETE",
    callback: () => {
      toast.success("Atividade removida com sucesso");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
