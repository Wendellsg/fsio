"use client";
import { Modals } from "@/components/molecules/modals";
import { EvolutionForm } from "@/components/organisms/EvolutionForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEvolutions } from "@/hooks/useEvolutions";
import { usePatients } from "@/hooks/usePatients";
import { Evolution } from "@/types";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useState } from "react";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";

export default function EvolutionsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [selectedEvolution, setSelectedEvolution] = useState<Evolution | null>(
    null
  );

  const { id } = params;
  const { Patients, refetch } = usePatients();

  const patient = Patients?.find((_patient) => _patient.id === id);

  const { evolutions, deleteEvolution } = useEvolutions();

  const patientEvolutions = evolutions?.filter(
    (evolution) => evolution.user.id === id
  );

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-4">
      <Modals
        isOpen={!!selectedEvolution}
        onClose={() => setSelectedEvolution(null)}
        title={
          selectedEvolution?.id ? `Evolução de ${patient?.name}` : "Evolução"
        }
      >
        <div />
        <EvolutionForm
          evolution={selectedEvolution!}
          onSubmit={() => {
            refetch();
            setSelectedEvolution(null);
          }}
          onCancel={() => setSelectedEvolution(null)}
        />
      </Modals>

      <div className="flex w-full items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
          Evoluções do paciente
        </h2>
        <Button
          onClick={() =>
            setSelectedEvolution({
              user: {
                id,
              },
            } as Evolution)
          }
          variant="secondary"
        >
          Nova <MdAddCircleOutline color="black" size={20} />
        </Button>
      </div>

      <div className="flex items-center my-4 gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={patient?.image} />
          <AvatarFallback>
            {patient?.name?.split(" ")[0][0]}
            {patient?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>

        <p className="font-bold text-md">{patient?.name}</p>
      </div>

      <div className="flex w-full flex-col gap-4 my-4">
        {patientEvolutions?.length === 0 && (
          <p className="font-bold text-md">Nenhuma evolução cadastrada</p>
        )}

        {patientEvolutions?.map((evolution, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col gap-4 p-4 rounded-sm min-h-fit border border-slate-10"
            >
              <div className="flex w-full justify-between my-2 gap-2">
                <p className="font-bold text-sm">
                  {format(
                    utcToZonedTime(new Date(evolution.date), "utc"),
                    "dd/MM/yyyy"
                  )}
                </p>

                <div className="flex gap-4">
                  <Button
                    onClick={() => deleteEvolution(evolution.id)}
                    variant={"destructive"}
                  >
                    <MdDelete color="black" />
                  </Button>
                  <Button
                    onClick={() => setSelectedEvolution(evolution)}
                    variant={"secondary"}
                  >
                    Editar
                  </Button>
                </div>
              </div>

              <p className="font-bold text-xs p-2 rounded-sm bg-primary 2 w-fit">
                Diagnostico Clínico
              </p>

              <p className="text-sm border-b border-gray-300 w-full pb-">
                {evolution.clinicalDiagnosis}
              </p>

              <p className="font-bold text-xs p-2 rounded-sm bg-primary 2 w-fit">
                Diagnostico Fisioterapêutico
              </p>
              <p className="text-sm border-b border-gray-300 w-full pb-2">
                {evolution.physicalDiagnosis}
              </p>
              <p className="font-bold text-xs p-2 rounded-sm bg-primary 2 w-fit">
                Evolução
              </p>
              <p className="text-sm border-b border-gray-300 w-full pb-2">
                {evolution.evolution}
              </p>
            </div>
          );
        })}
      </div>

      <div />
    </div>
  );
}
