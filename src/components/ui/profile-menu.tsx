"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { UserRoleEnum } from "@prisma/client";
import Link from "next/link";
import { ProfileImage } from "../molecules/profile-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Skeleton } from "./skeleton";

export function ProfileMenu() {
  const { userData } = useUserData();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage className="w-20 h-20" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/perfil/profissional"} className="w-full h-full">
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/perfil/profissional/editar"} className="w-full h-full">
            Editar
          </Link>
        </DropdownMenuItem>
        {userData?.roles?.includes(UserRoleEnum.professional) && (
          <DropdownMenuItem>
            <Link href={"/assinatura"} className="w-full h-full">
              Assinatura
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileMenuSkeleton() {
  return (
    <Skeleton className="w-20 h-20 rounded-full border outline-2 outline-accent" />
  );
}
