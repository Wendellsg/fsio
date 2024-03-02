import {
  PatientProfile,
  ProfessionalProfile,
} from "@/components/organisms/profiles";
import { getSessionRole } from "@/lib/session";

export default function Profile() {
  const role = getSessionRole();

  function ProfileByRole() {
    if (role === "professional") {
      return <ProfessionalProfile />;
    } else {
      return <PatientProfile />;
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4 items-start justify-between">
      <h2 className="text-lg bg-accent p-2 rounded-xl font-bold w-fit">
        Meu perfil
      </h2>

      <ProfileByRole />
    </div>
  );
}
