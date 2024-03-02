"use client";

import { useProfessionalRequests } from "@/hooks/useRequests";
import { Request } from "@prisma/client";
import { RequestCard, RequestCardSkeleton } from "./card";

export type RequestWithUser = Request & {
  user: {
    name: string;
    email: string;
    id: string;
    image: string | null;
  };
};
export function ProfessionalRequests() {
  const { requests, isLoading, refetch } = useProfessionalRequests();

  if (isLoading) return <RequestCardSkeleton />;

  return (
    <div className="w-full gap-4 flex-wrap">
      {requests?.map((request, index) => {
        return (
          <RequestCard
            key={request.id || index}
            request={request}
            refetch={refetch}
          />
        );
      })}

      {!requests?.length && (
        <div className="w-full flex items-center justify-center gap-4">
          <p>Você não tem nenhuma solicitação de paciente</p>
        </div>
      )}
    </div>
  );
}
