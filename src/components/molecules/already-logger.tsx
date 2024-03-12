import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { translateUserRole } from "@/types";
import { UserRoleEnum } from "@prisma/client";

import Link from "next/link";

const pathByRole = {
  [UserRoleEnum.admin]: "/admin",
  [UserRoleEnum.patient]: "/paciente/",
  [UserRoleEnum.professional]: "/profissional",
};

export const AlreadyLoggedCard = () => {
  const { userData } = useUserData();
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px">
      <Avatar className="w-40 h-40">
        <AvatarImage src={userData?.image || ""} />
        <AvatarFallback>
          {userData?.name?.split(" ")[0][0]}
          {userData?.name?.split(" ")[1][0]}
        </AvatarFallback>
      </Avatar>
      <p className="mt-4">Você está logado(a) como</p>
      <p className="text-lg font-bold">{userData?.name}</p>

      <div className="flex flex-col my-8 gap-4">
        <p className="text-xs w-full text-center">Continuar como</p>
        {userData?.roles?.map((role: UserRoleEnum) => (
          <Button className="w-36" type="submit" key={role}>
            <Link
              href={pathByRole[role] || "/"}
              passHref
              className="text-black w-full h-full flex items-center justify-center"
            >
              {translateUserRole(role)}
            </Link>
          </Button>
        ))}

        <Button
          variant={"outline"}
          type="button"
          className="w-36"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};
