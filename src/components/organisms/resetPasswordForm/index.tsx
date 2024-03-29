"use client";
import { Button } from "@/components/ui/button";
import { Input, InputBox } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import { fisioFetcher } from "@/hooks/Apis";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  function forgotPassword(e: React.FormEvent) {
    e.preventDefault();

    fisioFetcher({
      url: "/auth/reset-password",
      method: "POST",
      data: { password, token },
      loadingFunction: setPending,
      callback: () => {
        toast.success("Senha alterada com sucesso", {
          action: (
            <Button variant={"outline"} onClick={() => router.push("/login")}>
              Login
            </Button>
          ),
          dismissible: true,
        });
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  }

  if (!token) return <p>Token inválido</p>;

  return (
    <form
      onSubmit={forgotPassword}
      className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px md:min-w-80"
    >
      <p className="font-bold">Cadastre sua nova senha</p>
      <InputBox>
        <Label htmlFor="password">Nova senha</Label>

        <Input
          placeholder="Senha"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputBox>

      <InputBox>
        <Label htmlFor="password-confirm">Confirme sua senha</Label>

        <Input
          placeholder="Senha"
          type="password"
          name="password-confirm"
          id="password-confirm"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </InputBox>

      <Button
        type="submit"
        className="w-full text-black font-bold"
        disabled={pending}
      >
        {pending ? <Loading className="text-white" size={15} /> : "Enviar"}
      </Button>
    </form>
  );
}
