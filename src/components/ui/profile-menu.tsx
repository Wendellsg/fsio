import { getSession } from "@/lib/auth.guard";
import prisma from "@/lib/prisma";
import { UserRoleEnum } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Skeleton } from "./skeleton";

async function getProfileData() {
  const session = getSession();
  return await prisma.user.findFirst({
    where: { id: session?.id },
  });
}

export async function ProfileMenu() {
  const session = getSession();
  const userData = await getProfileData();
  const profileRoute = session?.roles.includes(UserRoleEnum.professional)
    ? "/perfil"
    : "/meu-perfil";

  if (!userData) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-20 h-20">
          <AvatarImage src={userData?.image || ""} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={profileRoute} className="w-full h-full">
            Perfil
          </Link>
        </DropdownMenuItem>
        {userData?.roles.includes(UserRoleEnum.professional) && (
          <DropdownMenuItem>
            <Link href={"/assinatura"} className="w-full h-full">
              Assinatura
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <a href="/api/auth/signout" className="w-full h-full">
            Sair
          </a>
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
