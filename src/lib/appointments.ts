import { AppointmentGetPayload } from "@/types";
import { format } from "date-fns";

export const getAppointments = (
  day: Date,
  appointments: AppointmentGetPayload[]
) => {
  const dayString = format(day, "yyyy-MM-dd");
  return appointments?.filter(
    (appointment) => format(appointment.startDate, "yyyy-MM-dd") === dayString
  );
};

export const getAppointmentsByHour = (
  appointments: AppointmentGetPayload[]
): {
  [key: string]: AppointmentGetPayload[];
} => {
  const appointmentsByHour = appointments?.reduce((acc, appointment) => {
    const hour = appointment.startDateTime.split(":")[0] + ":00";
    return {
      ...acc,
      [hour]: [...(acc[hour] || []), appointment],
    };
  }, {} as { [key: string]: AppointmentGetPayload[] });

  //Sort appointments by hour

  if (!appointmentsByHour) return {};

  const sorted = Object.keys(appointmentsByHour)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: appointmentsByHour[key],
      }),
      {}
    );

  return sorted;
};
