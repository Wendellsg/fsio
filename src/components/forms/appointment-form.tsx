"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentStatusEnum, type Prisma, type User } from "@prisma/client";
import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { useProfessionalData } from "@/hooks/useProfessionalData";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  useAppointmentComments,
  useAppointments,
} from "../../hooks/useAppointments";
import { usePatients } from "../../hooks/usePatients";
import {
  type AppointmentGetPayload,
  translateAppointmentStatus,
} from "../../types";
import { PacienteAvatar } from "../molecules/patient-avatar";
import { Select } from "../molecules/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SearchInput } from "../ui/search-input";
type AppointmentFormProps = {
  appointment: AppointmentGetPayload;
  trigger: React.ReactNode;
};

const AppointmentStatusOptions = Object.keys(AppointmentStatusEnum).map(
  (key) => ({
    value: key,
    label: translateAppointmentStatus(key as AppointmentStatusEnum),
  })
);

export const AppointmentForm = ({
  appointment,
  trigger,
}: AppointmentFormProps) => {
  const { patients } = usePatients();
  const [newComment, setNewComment] = useState("");
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    return patients?.filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, patients]);

  const { createAppointment, updateAppointment, deleteAppointment } =
    useAppointments();

  const { comments, createComment, deleteComment } = useAppointmentComments(
    appointment.id
  );

  const [selectedPatient, setSelectedPatient] = useState<Partial<User> | null>(
    appointment?.patient as Partial<User>
  );

  const [selectedDate, setSelectedDate] = useState<Date>(
    appointment?.startDate || new Date()
  );

  const [startDateTime, setStartDateTime] = useState<string>(
    appointment?.startDateTime
  );

  const [endDateTime, setEndDateTime] = useState<string>(
    appointment?.endDateTime
  );

  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatusEnum>(
    appointment?.status || AppointmentStatusEnum.scheduled
  );

  const { professionalData } = useProfessionalData();

  const handleSubmit = () => {
    if (
      !selectedPatient?.id ||
      !selectedDate ||
      !startDateTime ||
      !endDateTime
    ) {
      return;
    }

    const appointmentData: Prisma.AppointmentUncheckedCreateInput = {
      ...appointment,
      patientId: selectedPatient?.id,
      startDate: selectedDate,
      startDateTime,
      endDateTime,
      status: selectedStatus,
      professionalId: professionalData?.id,
      timeZone: new Date().getTimezoneOffset() / 60,
    };

    if (appointment?.id) {
      console.log(appointmentData);
      updateAppointment(appointment.id, appointmentData);
    } else {
      console.log(appointmentData);
      createAppointment(appointmentData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {appointment?.id ? "Editar consulta" : "Nova consulta"}
          </DialogTitle>
          <DialogDescription>
            {appointment?.id
              ? "Edite os campos abaixo para atualizar a consulta"
              : "Preencha os campos abaixo para criar uma nova consulta"}
          </DialogDescription>
        </DialogHeader>
        <div className=" h-full flex flex-col gap-4 p-8 w-full max-w-full">
          {selectedPatient ? (
            <div className="flex  flex-col justify-start items-start gap-4 max-w-full">
              <p className="font-bold">Paciente</p>
              <button onClick={() => setSelectedPatient(null)} type="button">
                <PacienteAvatar
                  image={selectedPatient.image || ""}
                  name={selectedPatient.name || ""}
                  index={1}
                  id={selectedPatient.id || ""}
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold">Selecione um paciente</p>

              <SearchInput
                placeholder="Buscar paciente"
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex gap-4 max-w-full overflow-x-auto">
                {filteredPatients?.slice(0, 10).map((_patient, index) => {
                  return (
                    <button
                      onClick={() => {
                        setSelectedPatient(_patient);
                      }}
                      key={_patient.id}
                      type="button"
                    >
                      <PacienteAvatar
                        image={_patient.image}
                        name={_patient.name}
                        index={index}
                        id={_patient.id}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedPatient && (
            <div className="flex flex-col gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (!date) return;
                      setSelectedDate(date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {selectedPatient && selectedDate && (
            <div className="flex flex-col gap-4">
              <p className="font-bold">Horário</p>

              <div className="flex items-center gap-4 flex-wrap">
                <input
                  type="time"
                  value={startDateTime}
                  className="picker"
                  onChange={(e) => setStartDateTime(e.target.value)}
                />
                <p className="text-sm whitespace-nowrap font-bold">até as</p>

                <input
                  type="time"
                  value={endDateTime}
                  className="picker"
                  onChange={(e) => setEndDateTime(e.target.value)}
                />
              </div>
            </div>
          )}

          {selectedPatient && selectedDate && endDateTime && (
            <div className="flex flex-col gap-4 w-full max-w-48">
              <Select
                className="w-full max-w-48"
                placeholder="Status"
                value={selectedStatus}
                onChange={(value) =>
                  setSelectedStatus(value as AppointmentStatusEnum)
                }
                options={AppointmentStatusOptions}
              />
            </div>
          )}

          {appointment.id && (
            <div className="flex- flex-col w-full gap-4">
              <div className="flex flex-col gap-4">
                <Label htmlFor="comment">Comentário</Label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Novo comentário"
                  name="comment"
                  id="comment"
                />
              </div>

              <div className="flex w-full justify-end gap-4 mt-4">
                <Button
                  onClick={() => {
                    if (newComment) {
                      createComment({
                        id: uuidv4(),
                        comment: newComment,
                        Appointment: { connect: { id: appointment.id } },
                      });
                      setNewComment("");
                    }
                  }}
                  className="w-48"
                >
                  Adicionar comentário
                </Button>
              </div>
              <p className="font-bold my-4">Comentários</p>

              {comments?.length === 0 && (
                <p className="text-xs">Nenhum comentário </p>
              )}
              {comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col gap-2 mr-4 mb-4 border-b border-gray-300 pl-4"
                >
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xs font-bold">
                      {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <FaTrash
                      cursor={"pointer"}
                      onClick={() => deleteComment(comment.id)}
                    />
                  </div>
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          )}

          <div className="w-full flex justify-center gap-4 mt-8" />
        </div>
        <DialogFooter>
          {appointment?.id && (
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  deleteAppointment(appointment.id);
                }}
                variant="destructive"
                className="w-48"
              >
                Excluir
              </Button>
            </DialogTrigger>
          )}

          <DialogTrigger asChild>
            <Button onClick={handleSubmit} type="submit" className="w-48">
              Salvar
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
