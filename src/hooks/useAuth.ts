"use client";

import { queryClient } from "@/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Formato de email inválido"),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  birthDate: z.coerce
    .date({
      required_error: "Data de nascimento é obrigatória",
    })
    .nullable(),
});
export type LoginData = z.infer<typeof createLoginSchema>;

export const useAuth = (type: "patient" | "others") => {
  const router = useRouter();

  const [isLogging, setIsLogging] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: {
      email: "",
      password: type === "patient" ? "default" : "",
      birthDate: null,
    },
  });

  const login = async ({
    email,
    password,
    birthDate,
  }: {
    email: string;
    password: string;
    birthDate: Date | null;
  }) => {
    setIsLogging(true);
    try {
      if (type === "patient") {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login/patient`,
          {
            email,
            password,
            birthDate,
          }
        );

        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_TOKEN_KEY as string,
          data.token
        );
      } else {
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
      }

      toast.success("Login efetuado com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["userData"],
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
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
