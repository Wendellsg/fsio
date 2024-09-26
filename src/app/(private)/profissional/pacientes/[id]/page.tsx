"use client";

import { RoutineForm } from "@/components/forms/rotine-form";
import RoutineCard from "@/components/molecules/routine-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fisioFetcher } from "@/hooks/Apis";
import {
  type RoutineWithActivities,
  removePatient,
  usePatient,
} from "@/hooks/usePatients";
import { getFullAddress } from "@/lib/address";
import { findAge } from "@/lib/date";
import type { RoutineData } from "@/lib/zod-schemas";
import { Cake, Mail, Phone, Pin, Ruler, Weight } from "lucide-react";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { toast } from "sonner";

export default function PacientePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const { patientData, refetch } = usePatient(id as string);

  return (
    <>
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

                <RoutineForm
                  routine={
                    {
                      userId: id,
                    } as RoutineWithActivities
                  }
                  onSubmit={async (NewRoutine: RoutineData) => {
                    await fisioFetcher({
                      url: "/routines",
                      method: "POST",
                      data: NewRoutine,
                      callback: () => {
                        toast.success("Rotina criada com sucesso");
                        refetch();
                      },
                    });
                  }}
                  trigger={
                    <Button variant="default">
                      <BsPlus className="text-2xl font-bold" />
                    </Button>
                  }
                />
              </div>
              <div className="flex items-center justify-start flex-wrap w-full gap-4 p-4">
                {patientData?.routines?.map((routine) => {
                  return (
                    <RoutineCard
                      key={routine.id}
                      routine={routine}
                      updatePatient={refetch}
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
            <Button type="button">
              Editar Paciente <RiEditBoxFill size={20} />
            </Button>

            <p className="font-bold text-md">{patientData?.name}</p>

            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Ver Detalhes</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center">
                      <Cake size={25} />
                      <span className="ml-2 font-semibold">
                        {findAge(patientData?.birthDate?.toDateString()) ??
                          "Sem idade"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Ruler size={25} />
                      <span className="ml-2 font-semibold">
                        {patientData?.height?.toString() ?? "Sem altura"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Weight size={25} />
                      <span className="ml-2 font-semibold">
                        {patientData?.weight?.toString() ?? "Sem peso"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Phone size={25} />
                      <span className="ml-2 font-semibold">
                        {patientData?.phone ?? "Sem telefone"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Mail size={25} />
                      <span className="ml-2 font-semibold">
                        {patientData?.email ?? "Sem email"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Pin size={25} />
                      <span className="ml-2 font-semibold">
                        {getFullAddress(patientData?.address) ?? "Sem endereço"}
                      </span>
                    </div>

                    {/* 
                
              
                    <InfoItem
                      icon={<FaEnvelope size={30} />}
                      text={patientData?.email}
                    />

                    {patientData?.address && (
                      <InfoItem
                        icon={<RiMapPin2Fill size={30} />}
                        iconSize="30px"
                        text={`${patientData?.address}, ${patientData?.addressNumber}, ${patientData?.addressCity} - ${patientData?.addressState}`}
                      />
                    )}
                  */}
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
