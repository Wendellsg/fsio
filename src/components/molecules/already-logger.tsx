import { Button } from "@/components/ui/button";
import { fisioFetcher } from "@/hooks/Apis";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { translateUserRole } from "@/types";
import { UserRoleEnum } from "@prisma/client";
import { AlertTriangle } from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";
import { ProfileImage } from "./profile-image";

const pathByRole = {
  [UserRoleEnum.admin]: "/admin",
  [UserRoleEnum.patient]: "/paciente/",
  [UserRoleEnum.professional]: "/profissional",
};

export const AlreadyLoggedCard = () => {
  const { userData } = useUserData();

  function resendVerificationEmail() {
    fisioFetcher({
      url: "/auth/resend-verification-code",
      method: "GET",
      callback: () => {
        toast.success("Email de verificação reenviado");
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  }

  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px">
      <ProfileImage className="w-40 h-40" />
      <p className="mt-4">Você está logado(a) como</p>
      <p className="text-lg font-bold">{userData?.name}</p>

      <div className="flex flex-col my-8 gap-4 justify-center items-center">
        {userData?.accountVerifiedAt ? (
          <>
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
          </>
        ) : (
          <>
            <AlertTriangle />
            <p className="text-xs w-full text-center ">
              Sua conta ainda não foi verificada
            </p>

            <Button
              variant={"secondary"}
              type="button"
              className="w-fit"
              onClick={resendVerificationEmail}
            >
              Reenviar email de verificação
            </Button>
          </>
        )}

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
