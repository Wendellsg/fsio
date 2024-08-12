import axios, { AxiosError } from "axios";

import { toast } from "sonner";

export const fisioApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export async function fisioFetcher<T>({
  url,
  method,
  data,
  loadingFunction,
  callback,
  onError,
  checkAuth,
}: {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: any;
  loadingFunction?: (value: boolean) => void;
  callback?: (data?: any) => void;
  onError?: (error: string) => void;
  checkAuth?: boolean;
}): Promise<T | undefined> {
  if (
    checkAuth &&
    !window.localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY as string)
  ) {
    return undefined;
  }

  loadingFunction && loadingFunction(true);
  try {
    const response = await fisioApi({
      url,
      method,
      data,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          process.env.NEXT_PUBLIC_TOKEN_KEY as string
        )}`,
      },
    });
    callback && callback(response.data);
    console.log(response.data);
    return response.data as T;
  } catch (error: AxiosError | any) {
    if (!error.response) {
      toast.error("Erro ao se conectar com o servidor");
      return undefined;
    }

    if (onError) {
      onError(error.response?.data.message);
    }
  } finally {
    //ATENÇÃO: Nunca retorne nada aqui por que o retorno do finally sobrescreve o retorno do try e do catch

    loadingFunction && loadingFunction(false);
  }
}
