import { toast } from "react-toastify";
import { fisioFetcher } from "./Apis";

export const useActivities = () => {
  const createActivity = async (activity: Partial<Activity>) => {
    return await fisioFetcher({
      url: `/users/routines/${activity.routine?.id}/activities`,
      method: "POST",
      data: activity,
      callback: () => {
        toast.success("Atividade criada com sucesso");
      },
    });
  };

  const deleteActivity = async (activity: Activity) => {
    return await fisioFetcher({
      url: `/users/routines/${activity.routine.id}/activities/${activity.id}`,
      method: "DELETE",
      callback: () => {
        toast.success("Atividade removida com sucesso");
      },
    });
  };

  return {
    createActivity,
    deleteActivity,
  };
};
