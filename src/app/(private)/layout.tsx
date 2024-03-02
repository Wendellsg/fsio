import NavMenu, { MenuItem } from "@/components/Nav";
import { AppContainer, PageContent } from "@/components/atoms/layouts";
import { getSession } from "@/lib/auth.guard";
import { UserRoleEnum } from "@prisma/client";

import { redirect } from "next/navigation";
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
  const session = getSession();

  if (!session?.roles.includes(UserRoleEnum.professional)) {
    redirect("/home");
  }

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
