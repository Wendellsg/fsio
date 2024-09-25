import NavMenu, { type MenuItem } from "@/components/organisms/navigation";
import { AppContainer, PageContent } from "@/components/ui/layouts";
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
      label: "Home",
      icon: <FaHouse />,
      href: "/paciente",
    },
    {
      href: "/paciente/agenda",
      icon: <FaCalendarCheck />,
      label: "Agenda",
    },
    {
      label: "Pacientes",
      icon: <FaUserGroup />,
      href: "/paciente/rotinas",
    },
    {
      label: "Perfil",
      icon: <FaDumbbell />,

      href: "/paciente/perfil",
    },
  ];

  return (
    <AppContainer>
      <NavMenu menuItems={menuItems} />
      <PageContent>{children}</PageContent>
    </AppContainer>
  );
}
