"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAppointments } from "@/hooks/useAppointments";
import { AppointmentCard } from "../appointment";

export function DashBoardAppointments() {
  const { appointments, isLoading } = useAppointments();

  if (isLoading) {
    return <AppointmentsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex gap-4 pl-4 overflow-x-auto pb-4 mt-8">
        {appointments?.slice(0, 5)?.map((appointment) => {
          return (
            <AppointmentCard
              appointment={appointment}
              index={() => {
                const index = appointments.findIndex(
                  (appointmentOfDay) => appointmentOfDay.id === appointment.id
                );
                return appointments.length - index;
              }}
              key={appointment.id}
            />
          );
        })}

        {appointments?.length === 0 && (
          <div className="flex w-full h-full items-center justify-start text-sm">
            <p>Nenhuma consulta encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function AppointmentsSkeleton() {
  return (
    <div className="flex gap-4 pl-4 overflow-x-auto pb-4 mt-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index}>
          <div className="w-16 h-16 object-cover rounded-full bg-white p-1 border-accent border-2">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full rounded-md p-2 " />
            <Skeleton className="w-full rounded-md p-2 " />
          </div>
        </Skeleton>
      ))}
    </div>
  );
}
