import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { fisioFetcher } from "../Apis";

export type GetPatientResponseDTO = Array<{
  id: string;
  name: string;
  image: string;
  email: string;
}>;

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
    url: `/requests`,
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
    url: `/patients`,
    method: "POST",
    data: patient,
    callback: () => {
      toast.success("Paciente criado com sucesso");
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

const getPatients = async (): Promise<GetPatientResponseDTO> => {
  return await fisioFetcher({
    url: `/patients`,
    method: "GET",
  });
};

export const updatePatient = async (
  patient: Partial<User>,
  diagnosis: string
) => {
  const response = await fisioFetcher({
    url: `/users/${patient.id}`,
    method: "PATCH",
    data: { patient, diagnosis },
    callback: () => {
      toast.success("Paciente atualizado com sucesso");
    },
  });

  if (!response) return false;
  return response;
};

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
    patients: patients || ([] as GetPatientResponseDTO),
  };
};

const getPatientData = async (patientId: string) => {
  const response = await fisioFetcher({
    url: `/users/patients/${patientId}`,
    method: "GET",
  });

  if (!response) return false;
  return response;
};

export function usePatient(id: string) {
  const { data: patientData, refetch } = useQuery({
    queryKey: ["patientData", id as string],
    queryFn: () => getPatientData(id as string),
    staleTime: 1000 * 60 * 10,
    enabled: !!id && id !== "undefined" && id !== "",
  });

  return { patientData, refetch };
}
