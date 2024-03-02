"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteProfessionalRequest } from "@/hooks/useRequests";
import { translateRequestStatus } from "@/types";
import { useState } from "react";
import { RequestWithUser } from ".";

export function RequestCard({
  request,
  refetch,
}: {
  request: RequestWithUser;
  refetch: () => void;
}) {
  const [canceling, setCanceling] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarImage src={request.user.image || ""} />
          <AvatarFallback>{request.user.name.slice(0, 1)[0]}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={request.user.image || ""} />
            <AvatarFallback>{request.user.name.slice(0, 1)[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold truncate">{request.user.name}</h2>
            <p className="text-sm text-gray-600">{request.user.email}</p>
            <p className="p-1 text-xs rounded-lg border bg-gray-200 flex items-center justify-center mt-2">
              {translateRequestStatus(request.status)}
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              disabled={canceling}
              variant={"outline"}
              onClick={async () => {
                setCanceling(true);
                await deleteProfessionalRequest(request.id);
                setCanceling(false);
                refetch();
              }}
              className="flex items-center justify-center w-20"
            >
              {canceling ? <Loading /> : "Cancelar"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function RequestCardSkeleton() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="w-12 h-12 rounded-full border-2" />
      ))}
    </div>
  );
}
