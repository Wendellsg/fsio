"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(createLoginSchema),
  });

  const login = async ({ email, password }) => {
    setIsLogging(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        email,
        password,
      });

      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLogging(false);
    }
  };

  return {
    login,
    register,
    handleSubmit: handleSubmit(login),
    loginErrors: errors,
    isLogging,
  };
};
