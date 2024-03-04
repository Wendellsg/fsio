"use client";

import { queryClient } from "@/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof createLoginSchema>;

export const useAuth = () => {
  const router = useRouter();

  const [isLogging, setIsLogging] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(createLoginSchema),
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLogging(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          email,
          password,
        }
      );

      window.localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_KEY as string,
        data.token
      );

      toast.success("Login efetuado com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["userData"],
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLogging(false);
    }
  };

  function logout() {
    window.localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY as string);
    queryClient.clear();
    router.push("/");
  }

  return {
    login,
    register,
    handleSubmit: handleSubmit(login),
    loginErrors: errors,
    isLogging,
    logout,
  };
};
