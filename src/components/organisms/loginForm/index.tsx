"use client";
import { AlreadyLoggedCard } from "@/components/molecules/already-logger";
import { Button } from "@/components/ui/button";
import { Input, InputBox, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";

export function LoginForm() {
  const { register, handleSubmit, loginErrors, isLogging } = useAuth();

  const { userData, isLoading } = useUserData();

  if (isLoading) return <Loading size={50} />;

  if (userData) {
    return <AlreadyLoggedCard />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px md:min-w-80"
    >
      <p className="font-bold">Faça login</p>
      <InputBox>
        <Label htmlFor="email">E-mail</Label>

        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          register={register}
        />

        {loginErrors?.email?.message && (
          <InputError>{loginErrors?.email?.message}</InputError>
        )}
      </InputBox>

      <InputBox>
        <Label htmlFor="password">Senha</Label>

        <Input
          placeholder="Senha"
          type="password"
          name="password"
          register={register}
        />

        {loginErrors?.password?.message && (
          <InputError>{loginErrors?.password?.message}</InputError>
        )}
      </InputBox>

      <Button
        type="submit"
        className="w-full text-black font-bold"
        disabled={isLogging}
      >
        {isLogging ? <Loading className="text-white" size={15} /> : "Entrar"}
      </Button>

      <div className="flex flex-col items-center justify-center gap-1 border-t border-gray-300 pt-4">
        <p className="text-xs">Não tem uma conta?</p>

        <Link href="/cadastro" passHref>
          <p className="text-md font-bold cursor-pointer">Cadastre-se</p>
        </Link>

        <p className="text-xs">Esqueceu sua senha?</p>

        <Link href="/esqueci-minha-senha" passHref>
          <p className="cursor-pointer font-bold">Recuperar senha</p>
        </Link>
      </div>
    </form>
  );
}
