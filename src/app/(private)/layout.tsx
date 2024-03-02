import NavMenu, { MenuItem } from "@/components/organisms/navigation";
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
      label: "Dashboard",
      icon: <FaHouse />,
      href: "/dashboard",
    },
    {
      href: "/agenda",
      icon: <FaCalendarCheck />,
      label: "Agenda",
    },
    {
      label: "Pacientes",
      icon: <FaUserGroup />,
      href: "/pacientes",
    },
    {
      label: "Exercícios",
      icon: <FaDumbbell />,

      href: "/exercicios",
    },
  ];

  return (
    <AppContainer>
      <NavMenu menuItems={menuItems} />
      <PageContent>{children}</PageContent>
    </AppContainer>
  );
}
