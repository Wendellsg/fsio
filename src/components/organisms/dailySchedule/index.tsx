"use client";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { getAppointments, getAppointmentsByHour } from "@/lib/appointments";
import { AppointmentGetPayload } from "@/types";
import { format, parseISO } from "date-fns";
import { useAppointments } from "../../../hooks/useAppointments";
import { AppointmentCard } from "../appointment";

export const DailySchedule = ({ selectedDay }: { selectedDay: Date }) => {
  const { appointments } = useAppointments();

  const appointmentsOfDay = getAppointments(selectedDay, appointments || []);

  const appointmentsByHour = getAppointmentsByHour(appointmentsOfDay);

  const hours = Object.keys(appointmentsByHour);

  return (
    <div className="min-w-fit flex flex-col flex-1 md:max-h-full max-h-none overflow-y-auto px-4">
      <h2 className="whitespace-nowrap text-lg md:text-xl font-bold mt-8 md:mt-0">
        {format(selectedDay, "dd 'de' MMMM 'de' yyyy")}
      </h2>

      <div className="flex flex-col w-full gap-2 mt-4 overflow-y-auto">
        {hours.map((hour) => {
          return (
            <div
              key={hour}
              className="grow-from-left-top flex-col flex max-h-fit gap-4"
            >
              <p className="text-lg text-gray-500 font-bold">
                {format(
                  parseISO(new Date().toISOString().split("T")[0] + "T" + hour),

                  "HH:mm"
                )}{" "}
              </p>

              <div className="flex flex-col gap-4 pl-4">
                {appointmentsByHour[hour].map(
                  (appointment: AppointmentGetPayload) => {
                    return (
                      <AppointmentForm
                        key={appointment.id}
                        appointment={appointment}
                        trigger={
                          <button>
                            <AppointmentCard
                              appointment={appointment}
                              index={() => {
                                const index = appointmentsOfDay.findIndex(
                                  (appointmentOfDay) =>
                                    appointmentOfDay.id === appointment.id
                                );
                                return appointmentsOfDay.length - index;
                              }}
                              key={appointment.id}
                            />
                          </button>
                        }
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}

        {hours.length === 0 && (
          <div className="flex  w-full h-full justify-center items-center">
            <p className="text-sm font-bold">
              Nenhum agendamento para este dia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
