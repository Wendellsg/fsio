import NavMenu, { MenuItem } from "@/components/organisms/navigation";
import { AppContainer, PageContent } from "@/components/ui/layouts";
import { ProfessionalProvider } from "@/providers/professional-provider";
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
    <AppContainer>
      <ProfessionalProvider>
        <NavMenu menuItems={menuItems} />
        <PageContent>{children}</PageContent>
      </ProfessionalProvider>
    </AppContainer>
  );
}
