"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { Button } from "../ui/button";

export function LoggedUser() {
  const { userData, isLoading } = useUserData();
  const { logout } = useAuth();

  return (
    <div className=" bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center p-8">
      <img src={"/assets/exercicios.png"} alt="exercicios" />

      {isLoading && <h1>Carregando...</h1>}

      {!isLoading && (
        <h1 className="font-bold mt-4">
          <b>
            Olá, {userData?.name ? userData.name.split(" ")[0] : "Visitante"}
          </b>
          !
        </h1>
      )}

      <h1 className="font-bold">
        Bem-vindo ao <b>Fsio.app!</b>
      </h1>
      <Link
        className="mt-6"
        href={userData?.id ? "/dashboard" : "/login"}
        passHref
      >
        <Button>Continuar</Button>
      </Link>

      {userData?.id && (
        <Button
          onClick={logout}
          variant={"ghost"}
          className="p-0 py-0 hover:bg-transparent"
        >
          Sair
        </Button>
      )}
    </div>
  );
}
