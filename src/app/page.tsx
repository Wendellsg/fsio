import { LeadForm } from "@/components/forms/lead-form";

export default function RootPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-center bg-cover bg-[url('https://fisio-app.s3.sa-east-1.amazonaws.com/images/pexels-ryutaro-tsukata-5473186.jpg')]">
      <div className="w-[400px] h-fit bg-white rounded-md flex flex-col items-center justify-center p-8">
        <img src={"/assets/exercicios.png"} alt="exercicios" />
        <h1 className="text-2xl font-bold">
          Bem vindo ao <b className="text-3xl text-accent">Fsio!</b>
        </h1>

        <p className="text-center mt-4 font-bold text-slate-600">
          O Fsio é um aplicativo feito para você, profissional de fisioterapia,
          organizar e acompanhar os exercícios dos seus pacientes.
        </p>

        <p className="text-center mt-4 font-bold text-slate-600">
          Em breve teremos mais novidades, deixe seu e-mail para ficar por
          dentro de tudo!
        </p>

        <hr />

        <LeadForm />
      </div>
    </main>
  );
}
