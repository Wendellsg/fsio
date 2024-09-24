/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { getAppointments } from "@/lib/appointments";
import type { AppointmentGetPayload } from "@/types";
import { UserRoleEnum } from "@prisma/client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  parse,
} from "date-fns";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppointments } from "../../../hooks/useAppointments";

const Calendar = ({
  selectedDay,
  today,
}: {
  selectedDay: Date;
  today: Date;
}) => {
  const currentMonth = format(selectedDay, "MMM-yyyy");

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const { appointments, isLoading } = useAppointments();
  const { userData } = useUserData();
  function getAppointmentImage(appointment: AppointmentGetPayload) {
    if (userData?.roles?.includes(UserRoleEnum.professional)) {
      return appointment.patient.image;
    }

    return appointment.professional?.user.image;
  }

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const router = useRouter();
  const pathName = usePathname();

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    router.push(`${pathName}?date=${format(firstDayNextMonth, "yyyy-MM-dd")}`);
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    router.push(`${pathName}?date=${format(firstDayNextMonth, "yyyy-MM-dd")}`);
  }

  if (!appointments && isLoading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-1 h-fit flex-col w-full py-4 px-8 rounded-xl bg-white shadow-md max-w-[90vw] md:max-w-[400px]  ">
      <button
        className="flex w-full justify-center items-center font-bold md:hidden"
        onClick={() => setShowCalendar(!showCalendar)}
        type="button"
      >
        {showCalendar ? "Ocultar calendário" : "Mostrar calendário"}
      </button>

      {showCalendar && (
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full justify-center items-center ">
            <div className="flex w-full justify-between items-center">
              <Button type="button" variant={"ghost"} onClick={previousMonth}>
                <FaChevronLeft aria-hidden="true" />
              </Button>

              <h2 className="font-bold text-md md:text-lg capitalize whitespace-nowrap">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <Button type="button" variant={"ghost"} onClick={nextMonth}>
                <FaChevronRight aria-hidden="true" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-4 w-full justify-center my-4">
              <WeekDate isToday={isSunday(today)}>Dom</WeekDate>
              <WeekDate isToday={isMonday(today)}>Seg</WeekDate>
              <WeekDate isToday={isTuesday(today)}>Ter</WeekDate>
              <WeekDate isToday={isWednesday(today)}>Qua</WeekDate>
              <WeekDate isToday={isThursday(today)}>Qui</WeekDate>
              <WeekDate isToday={isFriday(today)}>Sex</WeekDate>
              <WeekDate isToday={isSaturday(today)}>Sab</WeekDate>
            </div>
            <div className="grid grid-cols-7 gap-2 w-full my-8">
              {days.map((day, dayIdx) => (
                <Day
                  key={day.toString()}
                  style={{
                    gridColumnStart: dayIdx === 0 ? getDay(day) + 1 : undefined,
                  }}
                  isSelected={
                    format(day, "yyyy-MM-dd") ===
                    format(selectedDay, "yyyy-MM-dd")
                  }
                  isCurrentMonth={
                    format(day, "yyyy-MM") ===
                    format(firstDayCurrentMonth, "yyyy-MM")
                  }
                  isToday={
                    format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                  }
                  dateTime={format(day, "yyyy-MM-dd")}
                  href={`${pathName}?date=${format(day, "yyyy-MM-dd")}`}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>

                  <div>
                    {getAppointments(day, appointments ?? [])
                      ?.slice(0, 2)
                      .map((appointment, meetIndex) => (
                        <Meeting
                          key={appointment.id}
                          style={{
                            left: meetIndex === 0 ? 0 : meetIndex + 12,
                          }}
                        >
                          <img
                            src={
                              getAppointmentImage(appointment) ||
                              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            }
                            alt=""
                            className="w-full h-auto aspect-square border-accent border object-cover rounded-full "
                          />
                        </Meeting>
                      ))}

                    {getAppointments(day, appointments ?? []).length > 2 && (
                      <Meeting
                        style={{
                          left: 24,
                        }}
                      >
                        <span className="text-xs">
                          +{getAppointments(day, appointments ?? []).length - 2}
                        </span>
                      </Meeting>
                    )}
                  </div>
                </Day>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
Calendar.displayName = "Calendar";
export default Calendar;

function WeekDate({
  isToday,
  children,
}: {
  isToday: boolean;
  children: React.ReactNode;
}) {
  const bgColor = isToday ? "bg-accent" : "bg-transparent";

  return (
    <span
      className={`w-full flex justify-center items-center rounded-lg font-bold text-xs md:text-sm text-gray-500 ${bgColor}`}
    >
      {children}
    </span>
  );
}

type DayProps = LinkProps & {
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
  children: React.ReactNode;
  dateTime: string;
  style?: React.CSSProperties;
};

export const Day = ({
  isToday,
  isCurrentMonth,
  isSelected,
  children,
  dateTime,
  ...props
}: DayProps) => {
  const textColor = isSelected
    ? "text-white"
    : isCurrentMonth
    ? "text-gray-700"
    : isSelected
    ? "text-black"
    : "text-gray-500";
  const bgColor = isSelected ? "bg-accent" : "bg-transparent";
  const borderColor = isToday ? "border-2 border-accent" : "border-none";
  const hoverBgColor = isSelected ? "bg-accent" : "hover:bg-gray-100";

  return (
    <Link
      className={`w-full h-auto aspect-square flex flex-col justify-center items-center relative rounded-lg text-xs md:text-sm font-bold ${textColor} ${bgColor} ${borderColor} cursor-pointer ${hoverBgColor}`}
      {...props}
    >
      {children}
    </Link>
  );
};

const Meeting: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      className={
        "w-5 h-auto aspect-content flex flex-col justify-center items-center absolute bottom[-5px] left-0 rounded-full text-white p-0.5 bg-accent cursor-pointer"
      }
      {...props}
    >
      {children}
    </div>
  );
};
