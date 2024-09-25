import { AppointmentForm } from "@/components/forms/appointment-form";
import Calendar from "@/components/organisms/calendar";
import { DailySchedule } from "@/components/organisms/dailySchedule";
import { Button } from "@/components/ui/button";
import { DateProvider } from "@/contexts/date-context";
import type { AppointmentGetPayload } from "@/types";
import { startOfToday } from "date-fns";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const today = startOfToday();
  const searchDate = searchParams.date?.replace(/-/g, "/");
  const parsedDate = searchDate ? new Date(searchDate) : today;

  return (
    <DateProvider date={parsedDate}>
      <div className="w-full flex items-start justify-start min-h-[80vh] p-8 flex-col h-fit overflow-y-auto">
        <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">Agenda</h2>

        {
          <div className="w-full flex flex-wrap justify-end items-center gap-4 min-h-fit">
            <div>
              <AppointmentForm
                appointment={{} as AppointmentGetPayload}
                trigger={<Button>Agendar</Button>}
              />
            </div>
          </div>
        }
        <div className="flex-wrap flex gap-4 w-full my-8">
          <Calendar today={today} selectedDay={parsedDate} />

          <DailySchedule selectedDay={parsedDate} />
        </div>
      </div>
    </DateProvider>
  );
}
