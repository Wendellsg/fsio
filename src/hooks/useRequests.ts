import { RequestWithUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fisioFetcher } from "./Apis";

export function getProfessionalRequests(): Promise<RequestWithUser[]> {
  return fisioFetcher({
    url: "/requests/professional",
    method: "GET",
  });
}

export function deleteProfessionalRequest(requestId: string) {
  return fisioFetcher({
    url: `/requests/${requestId}`,
    method: "DELETE",
  });
}

export function useProfessionalRequests() {
  const {
    data: requests,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["professionalRequests"],
    queryFn: getProfessionalRequests,
  });

  return {
    requests,
    error,
    isLoading,
    refetch,
  };
}
