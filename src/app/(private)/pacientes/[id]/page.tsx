"use client";

import RoutineCard from "@/components/RoutineCard";
import { RoutineForm } from "@/components/RoutineForm";
import { InfoItem } from "@/components/molecules/infoItem";
import { Modals } from "@/components/molecules/modals";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fisioFetcher } from "@/hooks/Apis";
import { usePatient, usePatients } from "@/hooks/usePatients";
import { Routine } from "@/types";
import { findAge } from "@/utils/date";
import Link from "next/link";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaEnvelope, FaRulerVertical, FaWeight } from "react-icons/fa";
import { HiCake } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiEditBoxFill, RiMapPin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function PacientePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const { patientData, refetch } = usePatient(id as string);
  const { removePatient } = usePatients();

  const [newRoutineModalOpen, setNewRoutineModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Modals
        isOpen={newRoutineModalOpen}
        onClose={() => setNewRoutineModalOpen(false)}
        title="Nova Rotina"
      >
        <RoutineForm
          routine={{} as Routine}
          onSubmit={async (NewRoutine) => {
            await fisioFetcher({
              url: `/users/${id}/routines`,
              method: "POST",
              data: NewRoutine,
              callback: () => {
                setNewRoutineModalOpen(false);
                toast.success("Rotina criada com sucesso");
                refetch();
              },
            });
          }}
        />
      </Modals>

      <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-4">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-lg bg-accent p-2 rounded-xl font-bold w-fit">
            Paciente
          </h2>
        </div>
        <div className="flex justify-between w-full gap-4 flex-col-reverse md:flex-row min-h-fit">
          <div className="flex flex-col w-full gap-4 justify-start">
            <div className="flex flex-col mt-8">
              <div className="flex items-center justify-between w-full p-4">
                <p className="font-bold text-lg">Rotinas</p>

                <Button
                  variant="default"
                  onClick={() => setNewRoutineModalOpen(!newRoutineModalOpen)}
                >
                  <BsPlus className="text-2xl font-bold" />
                </Button>
              </div>
              <div className="flex items-center justify-start flex-wrap w-full gap-4 p-4">
                {patientData?.routines?.map((routine: Routine) => {
                  return (
                    <RoutineCard
                      key={routine.id}
                      routine={routine}
                      updateUser={refetch}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:min-w-[300px] gap-4 justify-start items-center min-h-fit md:w-fit">
            <Avatar className="w-32 h-32">
              <AvatarImage src={patientData?.image} />
              <AvatarFallback>
                {patientData?.name?.split(" ")[0][0]}
                {patientData?.name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <Button type="submit">
              Editar Paciente <RiEditBoxFill size={20} />
            </Button>

            <p className="font-bold text-md">{patientData?.name}</p>

            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Ver Detalhes</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full flex flex-col gap-4">
                    <InfoItem
                      icon={<HiCake size={30} />}
                      text={
                        patientData?.birthDate
                          ? findAge(patientData?.birthDate) + " anos"
                          : "Sem idade"
                      }
                    />
                    <InfoItem
                      icon={<FaRulerVertical size={30} />}
                      text={
                        patientData?.height
                          ? patientData?.height?.toString() + " cm"
                          : "Sem altura"
                      }
                    />
                    <InfoItem
                      icon={<FaWeight size={30} />}
                      text={
                        patientData?.weight
                          ? patientData?.weight?.toString() + " Kg"
                          : "Sem peso"
                      }
                    />
                    <InfoItem
                      icon={<IoLogoWhatsapp size={30} />}
                      text={patientData?.phone || "Sem telefone"}
                    />
                    <InfoItem
                      icon={<FaEnvelope size={30} />}
                      text={patientData?.email}
                    />

                    {patientData?.address && (
                      <InfoItem
                        icon={<RiMapPin2Fill size={30} />}
                        iconSize="30px"
                        text={
                          patientData?.address +
                          ", " +
                          patientData?.addressNumber +
                          ", " +
                          patientData?.addressCity +
                          " - " +
                          patientData?.addressState
                        }
                      />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Evoluções</AccordionTrigger>
                <AccordionContent>
                  <Link href={`/pacientes/evolucoes/${id}`} passHref>
                    <p className="text-md font-bold cursor-pointer">
                      Ver todas
                    </p>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button variant={"destructive"} onClick={() => removePatient(id)}>
              Remover Paciente
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
