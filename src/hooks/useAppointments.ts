import { useDate } from "@/contexts/date-context";
import { AppointmentGetPayload } from "@/types";
import { AppointmentComment, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { fisioFetcher } from "./Apis";
import { useUserData } from "./useUserData";

export const useAppointments = () => {
  const { userData } = useUserData();
  const { date } = useDate();

  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment(),
    staleTime: 1000 * 60 * 10,
    enabled: !!userData && !!date,
  });

  const getAppointment = async (): Promise<AppointmentGetPayload[]> => {
    return await fisioFetcher({
      url: "/appointments/professional" + `?date=${format(date, "yyyy-MM-dd")}`,
      method: "GET",
    });
  };

  const createAppointment = async (
    data: Prisma.AppointmentUncheckedCreateInput
  ) => {
    await fisioFetcher({
      url: `/appointments`,
      method: "POST",
      data,
      callback: () => {
        refetch();
        toast.success("Agendamento criado com sucesso");
      },
    });
  };

  const updateAppointment = async (
    id: string,
    data: Prisma.AppointmentUncheckedUpdateInput
  ) => {
    await fisioFetcher({
      url: `/appointments/${id}`,
      method: "PATCH",
      data,
      callback: () => {
        refetch();
        toast.success("Agendamento atualizado com sucesso");
      },
    });
  };

  const deleteAppointment = async (id: string) => {
    await fisioFetcher({
      url: `/appointments/${id}`,
      method: "DELETE",
      callback: () => {
        refetch();
        toast.success("Agendamento removido com sucesso");
      },
    });
  };

  return {
    appointments: appointments,
    isLoading,
    refetch,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

export function useAppointmentComments(appointmentId: string) {
  const { data: comments, refetch } = useQuery({
    queryKey: ["comments", appointmentId],
    queryFn: () => getComments(appointmentId),
    enabled: !!appointmentId,
  });

  const getComments = async (id: string): Promise<AppointmentComment[]> => {
    return await fisioFetcher({
      url: `/appointments/${id}/comments`,
      method: "GET",
    });
  };

  const createComment = async (data: Prisma.AppointmentCommentCreateInput) => {
    await fisioFetcher({
      url: `/appointments/${appointmentId}/comments`,
      method: "POST",
      data,
      callback: () => {
        refetch();
        toast.success("Comentário criado com sucesso");
      },
    });
  };

  const updateComment = async (
    id: string,
    data: Partial<AppointmentComment>
  ) => {
    await fisioFetcher({
      url: `/appointments/${appointmentId}/comments/${id}`,
      method: "PATCH",
      data,
      callback: () => {
        refetch();
        toast.success("Comentário atualizado com sucesso");
      },
    });
  };

  const deleteComment = async (id: string) => {
    await fisioFetcher({
      url: `/appointments/${appointmentId}/comments/${id}`,
      method: "DELETE",
      callback: () => {
        refetch();
        toast.success("Comentário removido com sucesso");
      },
    });
  };

  return {
    comments: comments || ([] as AppointmentComment[]),
    createComment,
    updateComment,
    deleteComment,
  };
}
