"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { toBrPhoneNumber } from "@/lib/phone";
import { AppointmentStatusEnum, Prisma, User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { useProfessionalData } from "@/hooks/useProfessionalData";
import {
  useAppointmentComments,
  useAppointments,
} from "../../hooks/useAppointments";
import { usePatients } from "../../hooks/usePatients";
import { AppointmentGetPayload, translateAppointmentStatus } from "../../types";
import { PacienteAvatar } from "../molecules/patient-avatar";
import { Select } from "../molecules/select";
import { AppointmentBadge } from "../organisms/appointment";
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

  const [selectedDate, setSelectedDate] = useState(
    appointment?.startDate ||
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  );

  const [selectedEndDate, setSelectedEndDate] = useState(
    appointment?.endDate ||
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  );

  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatusEnum>(
    appointment?.status || AppointmentStatusEnum.scheduled
  );

  const { professionalData } = useProfessionalData();

  const handleSubmit = () => {
    const appointmentData: Prisma.AppointmentUncheckedCreateInput = {
      ...appointment,
      patientId: selectedPatient?.id!,
      startDate: selectedDate,
      endDate: selectedEndDate,
      status: selectedStatus,
      professionalId: professionalData?.id!,
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
              <button onClick={() => setSelectedPatient(null)}>
                <PacienteAvatar
                  image={selectedPatient.image!}
                  name={selectedPatient.name!}
                  index={1}
                  id={selectedPatient.id!}
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
                        setSelectedPatient(_patient), console.log(_patient);
                      }}
                      key={_patient.id}
                    >
                      <PacienteAvatar
                        image={_patient.image!}
                        name={_patient.name!}
                        index={index}
                        id={_patient.id!}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedPatient && (
            <div className="flex flex-col gap-4">
              <p className="font-bold">Data</p>
              <input
                type="date"
                value={new Date(selectedDate).toISOString().split("T")[0]}
                className="picker"
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
          )}

          {selectedPatient && selectedDate && (
            <div className="flex flex-col gap-4">
              <p className="font-bold">Horário</p>

              <div className="flex items-center gap-4 flex-wrap">
                <input
                  type="time"
                  value={new Date(selectedDate)
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                    .slice(0, 5)}
                  className="picker"
                  onChange={(e) =>
                    setSelectedDate(
                      new Date(
                        new Date(
                          `${
                            new Date(selectedDate).toISOString().split("T")[0]
                          }T${e.target.value}`
                        ).getTime() -
                          new Date().getTimezoneOffset() * 60000
                      )
                    )
                  }
                />
                <p className="text-sm whitespace-nowrap font-bold">até as</p>

                <input
                  type="time"
                  value={new Date(selectedEndDate)
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                    .slice(0, 5)}
                  className="picker"
                  onChange={(e) =>
                    setSelectedEndDate(
                      new Date(
                        new Date(
                          `${
                            new Date(selectedDate).toISOString().split("T")[0]
                          }T${e.target.value}`
                        ).getTime() -
                          new Date().getTimezoneOffset() * 60000
                      )
                    )
                  }
                />
              </div>
            </div>
          )}

          {selectedPatient && selectedDate && selectedEndDate && (
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

          <div className="w-full flex justify-center gap-4 mt-8"></div>
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

export const AppointmentDetails = ({
  appointment,
}: {
  appointment: AppointmentGetPayload;
}) => {
  return (
    <div className="h-full flex flex-col px-4 gap-4 w-full">
      <div className="flex justify-start items-center gap-4 max-w-full border-b-2 pb-4">
        <Avatar className="w-28 h-28">
          <AvatarImage src={appointment.professional.user.image} />
          <AvatarFallback>
            {appointment.professional.user.name.split(" ")[0][0]}
            {appointment.professional.user.name.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <Link href={`/profissionais/${appointment.professional.id}`} passHref>
            <p className="font-bold hover:text-sky hover:underline">
              {appointment.professional.user.name}
            </p>
          </Link>
          <p className="w-fit p-1 rounded-lg bg-primary font-bold">
            {appointment.professional.profession}
          </p>

          <div className="w-full flex gap-2">
            <Phone size={20} />
            <p className="font-bold">
              {toBrPhoneNumber(appointment.professional.phone)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center font-bold">
        <CalendarDays />
        <p>{new Date(appointment.startDate).toLocaleDateString("pt-BR")}</p>
      </div>

      <div className="flex  gap-2 items-center font-bold">
        <Clock />
        <span>
          {" "}
          {format(appointment.startDate, "HH:mm")} -
          {format(appointment.endDate, "HH:mm")}
        </span>
      </div>

      <AppointmentBadge status={appointment.status}>
        {translateAppointmentStatus(appointment.status)}
      </AppointmentBadge>
    </div>
  );
};
