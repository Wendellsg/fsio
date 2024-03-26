"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDumbbell, FaHeadset } from "react-icons/fa6";
export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const checkActive = (href: string, pathName: string) => {
  let currentPath = pathName.replace("profissional", "");
  currentPath = currentPath.replace("paciente", "");
  currentPath = currentPath.replace("admin", "");
  href = href.replace("profissional", "");
  href = href.replace("paciente", "");
  href = href.replace("admin", "");

  if (currentPath === "/" && href === "/") {
    return true;
  }

  return currentPath.includes(href) && href !== "/";
};
export default function NavMenu({ menuItems }: { menuItems: MenuItem[] }) {
  const pathName = usePathname();

  return (
    <nav className="flex bg-accent w-full h-16 min-h-16 rounded-s-lg md:w-36 md:min-w-36 md:h-full md:min-h-full md:rounded-lg md:flex-col items-center justify-between p-4">
      <div className="hidden md:flex justify-center items-center">
        <img src={"/assets/exercicios.png"} alt="logo" width={40} height={80} />
      </div>
      <ul className="gap-2 flex md:flex-col w-full justify-evenly items-center">
        {menuItems.map((item) => (
          <Link href={item.href} passHref key={item.href}>
            <li
              className={`flex justify-center items-center rounded-full ${
                checkActive(item.href, pathName) ? "bg-white" : ""
              } hover:bg-white text-black cursor-pointer w-12 h-12 md:w-16 md:h-16 text-2xl`}
            >
              {item.icon}
            </li>
          </Link>
        ))}
      </ul>

      <div>
        <Link
          className="hidden md:flex justify-center items-center "
          href="/ajuda"
          passHref
        >
          <FaHeadset /> <span className="ml-2 font-bold">Ajuda</span>
        </Link>
      </div>
    </nav>
  );
}

const adminMenuItens: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <FaHeadset />,
    href: "/admin",
  },

  {
    label: "Usuários",
    icon: <Users size={15} />,
    href: "/admin/usuarios",
  },
  {
    label: "Exercícios",
    icon: <FaDumbbell />,
    href: "/admin/exercicios",
  },
];

export function AdminNavigation() {
  const pathName = usePathname();

  const { logout } = useAuth();

  const { userData } = useUserData();

  return (
    <nav className="border-x min-w-72 min-h-full p-8 flex flex-col">
      <div className="flex justify-start items-center gap-2 mb-8">
        <img src={"/assets/exercicios.png"} alt="logo" width={20} height={40} />
        <span className="font-bold text-xl">Painel de Admin</span>
      </div>

      <ul className="flex flex-col gap-2">
        {adminMenuItens.map((item) => (
          <li key={item.href}>
            <Link
              data-active={checkActive(item.href, pathName)}
              href={item.href}
              className="flex gap-2 rounded-lg p-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer w-full text-black data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
            >
              <span className="w-8">{item.icon}</span>
              <span className="text-sm font-bold">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full mt-auto flex gap-2">
        <Avatar className="w-12 h-12 text-lg">
          <AvatarImage src={userData?.image || ""} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>

        <Button
          variant={"link"}
          type="button"
          className="w-12 text-black"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </nav>
  );
}
