"use client";

import {
  PacienteAvatar,
  PatientAvatarSkeleton,
} from "@/components/molecules/patient-avatar";
import { usePatients } from "@/hooks/usePatients";

export function DashboardPatients() {
  const { patients, isLoading } = usePatients();

  if (isLoading) return <DashboardPatientsSkeleton />;

  return (
    <div className="flex my-4 overflow-auto p-2 gap-2 scrollbar-hide">
      {patients?.map((paciente, index) => {
        return (
          <PacienteAvatar
            key={index}
            image={paciente.image || ""}
            name={paciente.name}
            index={index}
            id={paciente.id}
            url={`/pacientes/${paciente.id}`}
          />
        );
      })}

      {patients?.length === 0 && (
        <div className="flex w-full h-full items-center justify-start text-sm">
          <p>Nenhuma paciente encontrado</p>
        </div>
      )}
    </div>
  );
}

export function DashboardPatientsSkeleton() {
  return (
    <div className="flex my-4 overflow-auto p-2 gap-2 scrollbar-hide">
      {Array.from({ length: 5 }).map((_, index) => (
        <PatientAvatarSkeleton key={index} />
      ))}
    </div>
  );
}
