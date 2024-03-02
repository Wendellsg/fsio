import axios from "axios";

import { toast } from "react-toastify";

export const fisioApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const fisioFetcher = async ({
  url,
  method,
  data,
  loadingFunction,
  callback,
  onError,
}: {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: any;
  loadingFunction?: (value: boolean) => void;
  callback?: (data?: any) => void;
  onError?: (error: any) => void;
}) => {
  loadingFunction && loadingFunction(true);
  try {
    const response = await fisioApi({
      url,
      method,
      data,
    });
    callback && callback(response.data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      toast.error("Erro ao se conectar com o servidor");
      return;
    }

    if (onError) {
      onError(error.response?.data.message);
    } else {
      toast.error(error.response?.data.message);
    }
  } finally {
    loadingFunction && loadingFunction(false);
  }
};
