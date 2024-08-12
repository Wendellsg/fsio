"use client";
import { ptBR } from "date-fns/locale";
setDefaultOptions({ locale: ptBR });

import { Loading } from "@/components/ui/loading";
import { useUserData } from "@/hooks/useUserData";
import { UserRoleEnum } from "@prisma/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function RouteGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, isLoading } = useUserData();

  const acceptedRoutesByRole = {
    [UserRoleEnum.professional]: ["profissional", "paciente"],
    [UserRoleEnum.patient]: ["paciente"],
    [UserRoleEnum.admin]: ["admin", "profissional", "paciente"],
  };

  const pathName = usePathname();
  const firstPath = pathName.split("/")[1];
  const router = useRouter();

  function checkIfRouteIsAcceptedByRole(roles: UserRoleEnum[]) {
    return roles.some((role) => {
      return acceptedRoutesByRole[role].includes(firstPath);
    });
  }

  useEffect(() => {
    if (
      userData?.roles?.[0] &&
      !checkIfRouteIsAcceptedByRole(userData?.roles)
    ) {
      router.push(acceptedRoutesByRole[userData?.roles[0]][0]);
    }
  }, [userData, pathName]);

  if (isLoading || !userData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
