import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-center bg-cover bg-[url('https://fisio-app.s3.sa-east-1.amazonaws.com/images/pexels-ryutaro-tsukata-5473186.jpg')]">
      <div className=" bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center gap-4 p-8">
        <img src={"/assets/exercicios.png"} alt="exercicios" />
        <h1 className="font-bold">
          <b>Olá, </b>!
        </h1>

        <h1 className="font-bold">
          Bem-vindo ao <b>Fsio.app!</b>
        </h1>
        <Link href={"/home"} passHref>
          <Button>Continuar</Button>
        </Link>
      </div>
    </main>
  );
}
