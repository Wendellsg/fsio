import { ExtensionEnum, FileTypeEnum, FileUploaded } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { fisioFetcher } from "./Apis";

export function useFileUploaded() {
  const [progress, setProgress] = useState<number>(0);

  const {
    data: files,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      return await fisioFetcher<FileUploaded[]>({
        url: "/uploads",
        method: "GET",
      });
    },
  });

  const upload = async (file: File, type: FileTypeEnum): Promise<Boolean> => {
    setProgress(1);
    const extension = file.name.split(".").pop();

    const acceptedExtensions = Object.values(ExtensionEnum);

    if (
      !extension ||
      !acceptedExtensions.includes(extension as ExtensionEnum)
    ) {
      toast.error("Extensão de arquivo inválida");
      setProgress(0);
      return false;
    }

    const correctExtension = extension as ExtensionEnum;

    const formData = new FormData();

    formData.append("file", file);

    const data = await fisioFetcher<{
      key: string;
      url: string;
    }>({
      url: `/uploads/upload-url?extension=${correctExtension}`,
      method: "GET",
      onError: (message: string) => {
        toast.error(message);
      },
    });

    if (!data?.url) {
      toast.error("Erro ao criar url de upload");
      setProgress(0);
      return false;
    }
    const fileData = formData.get("file");

    const options = {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / (total || 1));

        setProgress(percent);
      },
    };

    try {
      await axios.put(data.url, fileData, options);

      const newFile: Partial<FileUploaded> = {
        key: data.key,
        size: file.size,
        extension: correctExtension,
        name: file.name,
        type,
      };

      await fisioFetcher({
        url: "/uploads",
        method: "POST",
        data: newFile,
      });

      return true;
    } catch (error) {
      toast.error("Erro ao enviar arquivo");
      return false;
    } finally {
      setProgress(0);
    }
  };

  return { files, isLoading, refetch, progress, upload };
}
