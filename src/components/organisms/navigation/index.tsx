"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeadset } from "react-icons/fa6";
export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};
export default function NavMenu({ menuItems }: { menuItems: MenuItem[] }) {
  const pathName = usePathname();

  const checkActive = (href: string) => {
    if (pathName === "/" && href === "/") {
      return true;
    }

    return pathName.startsWith(href) && href !== "/";
  };

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
                checkActive(item.href) ? "bg-white" : ""
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
