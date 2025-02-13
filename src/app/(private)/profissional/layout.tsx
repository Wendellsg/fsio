import NavMenu, { type MenuItem } from "@/components/organisms/navigation";
import { AppContainer, PageContent } from "@/components/ui/layouts";
import { RouteGuardProvider } from "@/providers";
import { ProfessionalProvider } from "@/providers/professional-provider";
import { UserRoleEnum } from "@prisma/client";
import {
  FaCalendarCheck,
  FaDumbbell,
  FaHouse,
  FaUserGroup,
} from "react-icons/fa6";

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <FaHouse />,
      href: "/profissional",
    },
    {
      href: "/profissional/agenda",
      icon: <FaCalendarCheck />,
      label: "Agenda",
    },
    {
      label: "Pacientes",
      icon: <FaUserGroup />,
      href: "/profissional/pacientes",
    },
    {
      label: "Exercícios",
      icon: <FaDumbbell />,

      href: "/profissional/exercicios",
    },
  ];

  return (
    <RouteGuardProvider role={UserRoleEnum.professional} redirect="/login">
      <AppContainer>
        <ProfessionalProvider>
          <NavMenu menuItems={menuItems} />
          <PageContent>{children}</PageContent>
        </ProfessionalProvider>
      </AppContainer>
    </RouteGuardProvider>
  );
}
