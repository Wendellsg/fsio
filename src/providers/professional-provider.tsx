/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PageContent } from "@/components/ui/layouts";
import { Loading } from "@/components/ui/loading";
import { useProfessionalData } from "@/hooks/useProfessionalData";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";

export function ProfessionalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { professionalData, isLoading } = useProfessionalData();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  if (!professionalData) {
    return <EndProfessionalRegister />;
  }

  return <>{children}</>;
}

function EndProfessionalRegister() {
  const { userData } = useUserData();

  if (!userData) {
    return <></>;
  }

  return (
    <PageContent>
      <div className="mx-auto my-auto flex flex-col items-center justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={userData?.image || ""} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-8 text-2xl">
          Olá, <b>{userData?.name?.split(" ")[0]}</b>!
        </h1>
        <p className="text-center text-lg font-semibold text-gray-700 mt-4">
          Finalize seu cadastro para acessar o sistema como profissional.
        </p>

        <Link href={"/perfil/profissional/editar"} className="mt-8">
          <Button className="">Finalizar cadastro</Button>
        </Link>

        <div className="hidden md:flex justify-center items-center mt-16">
          <img
            src={"/assets/exercicios.png"}
            alt="logo"
            width={40}
            height={80}
          />
        </div>
      </div>
    </PageContent>
  );
}
