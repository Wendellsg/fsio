import type { PatientData } from "@/lib/zod-schemas";
import type { Address, Prisma, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { fisioFetcher } from "../Apis";

export type GetPatientsResponseDTO = Array<{
  id: string;
  name: string;
  image: string;
  email: string;
}>;
export type RoutineWithExercise = Prisma.RoutineGetPayload<{
  include: {
    exercise: true;
    professional: {
      include: {
        user: true;
      };
    };
    user: {
      select: {
        id: true;
      };
    };
  };
}>;

export type GetPatientResponseDTO = {
  id: string;
  name: string;
  email: string;
  image: string;
  birthDate: Date;
  weight: number;
  phone: string;
  height: number;
  professionals: Array<{ id: string }>;
  address: Address;
};

export const searchPatient = async (email: string) => {
  const response = await fisioFetcher({
    url: `/users/by-email?email=${email}`,
    method: "GET",
    onError: (error) => {
      toast.warning(error);
    },
  });

  if (!response) return false;
  return response;
};

export const addPatient = async (patientId: string) => {
  return await fisioFetcher({
    url: "/requests",
    method: "POST",
    data: { patientId },
    callback: () => {
      toast.success("Requisição enviada com sucesso");
    },
  });
};

export const createPatient = async (patient: {
  name: string;
  email: string;
}) => {
  return await fisioFetcher({
    url: "/patients",
    method: "POST",
    data: patient,
    callback: () => {
      toast.success("Paciente criado com sucesso");
    },
    onError: (error) => {
      toast.warning(error);
    },
  });
};

export const removePatient = async (patientId: string) => {
  await fisioFetcher({
    url: `/patients/${patientId}`,
    method: "DELETE",
    callback: () => {
      toast.success("Paciente removido com sucesso");
    },
  });
};

const getPatients = async () => {
  return await fisioFetcher<GetPatientsResponseDTO>({
    url: "/patients",
    method: "GET",
  });
};

export const updatePatientDiagnoses = async (
  patient: Partial<User>,
  diagnosis: string
) => {
  const response = await fisioFetcher({
    url: `/patients/${patient.id}/diagnosis`,
    method: "PATCH",
    data: { diagnosis },
    callback: () => {
      toast.success("Paciente atualizado com sucesso");
    },
  });

  if (!response) return false;
  return response;
};

export function updatePatient(patientId: string, patient: PatientData) {
  return fisioFetcher({
    url: `/patients/${patientId}`,
    method: "PATCH",
    data: patient,
    callback: () => {
      toast.success("Paciente atualizado com sucesso");
    },
  });
}

export const usePatients = () => {
  const {
    data: patients,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: () => getPatients(),
    staleTime: 1000 * 60 * 10,
  });

  const [searchInput, setSearchInput] = useState("");

  const filteredPatients = useMemo(() => {
    if (!patients) return [];
    if (!searchInput) return patients;

    return patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [patients, searchInput]);

  return {
    filteredPatients,
    refetch,
    isLoading,
    setSearchInput,
    searchInput,
    patients: patients ?? [],
  };
};

const getPatientData = async (patientId: string) => {
  return await fisioFetcher<GetPatientResponseDTO>({
    url: `/patients/${patientId}`,
    method: "GET",
  });
};

export function usePatient(id: string) {
  const {
    data: patientData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["patientData", id as string],
    queryFn: () => getPatientData(id as string),
    staleTime: 1000 * 60 * 10,
  });

  return { patientData, refetch, isLoading };
}
