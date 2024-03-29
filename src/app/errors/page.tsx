import { Button } from "@/components/ui/button";
import { DEFAULT_ERROS } from "@/constants/errors";
import { Bug } from "lucide-react";
import Link from "next/link";

export default function ErrorsPage({
  searchParams,
}: {
  searchParams: {
    error: string;
  };
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex flex-col items-center justify-center">
        <Bug size={64} className="" />
        <h1 className="text-3xl font-bold">Não foi desta vez</h1>
        <p className="text-xl mt-4 font-semibold">
          {DEFAULT_ERROS[searchParams.error].title || "Erro desconhecido"}
        </p>

        <p className="text-md mt-4">
          {DEFAULT_ERROS[searchParams.error].description ||
            "Ocorreu um erro desconhecido. Por favor, tente novamente."}
        </p>

        <Button className="mt-4">
          <Link href="/">
            <span>Voltar para a página inicial</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
