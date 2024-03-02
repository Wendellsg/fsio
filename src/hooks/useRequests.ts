import { RequestWithUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fisioFetcher } from "./Apis";

export function getProfessionalRequests(): Promise<RequestWithUser[]> {
  return fisioFetcher({
    url: "/patients/requests",
    method: "GET",
  });
}

export function deleteProfessionalRequest(requestId: string) {
  return fisioFetcher({
    url: `/patients/requests/${requestId}`,
    method: "DELETE",
  });
}

export function useProfessionalRequests(initialData: RequestWithUser[] = []) {
  const {
    data: requests,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["professionalRequests"],
    queryFn: getProfessionalRequests,
    initialData,
  });

  return {
    requests,
    error,
    isLoading,
    refetch,
  };
}
