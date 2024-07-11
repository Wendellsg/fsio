import { ProfessionalForm } from "@/components/forms/professional";
import { BackLink } from "@/components/ui/back-link";

export default function ProfessionalProfileEditPage() {
  return (
    <div className="w-full">
      <div className="flex items-center">
        <BackLink className="mr-2" />
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
          Cadastro Profissional
        </h2>
      </div>
      <ProfessionalForm />
    </div>
  );
}
