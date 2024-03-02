import axios, { AxiosProgressEvent } from "axios";
import { toast } from "react-toastify";
import { fisioApi } from "../Apis";

export const useUploader = () => {
  const getPresinedUrl = async (extention: string) => {
    try {
      const response = await fisioApi.post("/uploads", {
        extention,
      });

      return response.data.url;
    } catch (error) {
      return null;
    }
  };

  const upload = async (file: File) => {
    const toastId = toast.info("Enviando arquivo...", {
      autoClose: false,
    });

    const extention = file.name.split(".").pop();

    const formData = new FormData();

    formData.append("file", file);

    const url = await getPresinedUrl(extention!);

    const fileData = formData.get("file");

    if (!url) {
      toast.error("Erro ao obter url");
      toast.dismiss(toastId);
      return;
    }

    const options = {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / (total || 1));

        toast.update(toastId, {
          render: `Enviando arquivo... ${percent}%`,
        });
      },
    };

    try {
      await axios.put(url, fileData, options);
      toast.update(toastId, {
        render: `Arquivo enviado com sucesso!`,
        autoClose: 3000,
        type: "success",
      });
      return url.split("?")[0];
    } catch (error) {
      toast.update(toastId, {
        render: `Erro ao enviar arquivo!`,
        autoClose: 3000,
        type: "error",
      });
      console.log(error);
      return null;
    }
  };

  return {
    upload,
  };
};
