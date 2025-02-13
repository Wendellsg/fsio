"use client";
import { ptBR } from "date-fns/locale";
setDefaultOptions({ locale: ptBR });

import { Loading } from "@/components/ui/loading";
import { useUserData } from "@/hooks/useUserData";
import type { UserRoleEnum } from "@prisma/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { useRouter } from "next/navigation";
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
  role,
  redirect = "/",
}: {
  children: React.ReactNode;
  role: UserRoleEnum;
  redirect?: string;
}) {
  const { userData, isLoading } = useUserData();

  const router = useRouter();

  useEffect(() => {
    if (!userData?.roles?.includes(role)) {
      router.push(redirect);
    }
  }, [userData, router, role, redirect]);

  if (isLoading || !userData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
