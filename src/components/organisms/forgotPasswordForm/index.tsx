"use client";
import { AlreadyLoggedCard } from "@/components/molecules/already-logger";
import { Button } from "@/components/ui/button";
import { Input, InputBox } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import { fisioFetcher } from "@/hooks/Apis";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  function forgotPassword(e: React.FormEvent) {
    e.preventDefault();

    fisioFetcher({
      url: "/auth/forgot-password",
      method: "POST",
      data: { email },
      loadingFunction: setPending,
      callback: () => {
        toast.success("E-mail enviado com sucesso");
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  }

  const { userData, isLoading } = useUserData();

  if (isLoading) return <Loading size={50} />;

  if (userData?.id) {
    return <AlreadyLoggedCard />;
  }

  return (
    <form
      onSubmit={forgotPassword}
      className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px md:min-w-80"
    >
      <p className="font-bold">Esqueci minha senha</p>
      <InputBox>
        <Label htmlFor="email">E-mail</Label>

        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputBox>

      <Button
        type="submit"
        className="w-full text-black font-bold"
        disabled={pending}
      >
        {pending ? <Loading className="text-white" size={15} /> : "Enviar"}
      </Button>

      <div className="flex flex-col items-center justify-center gap-1 border-t border-gray-300 pt-4">
        <p className="text-xs">
          Um email será enviado para o cadastro de uma nova senha
        </p>
      </div>
    </form>
  );
}
