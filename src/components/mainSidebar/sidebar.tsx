import type { ReactNode } from "react";
import { Link } from "@/ui/link";

import House from "@/ui/icons/house";
import { Search } from "lucide-react";

import SidebarItem from "./sidebarItem";
import ChangeTheme from "../changeTheme";
import { cn } from "@/utils/cn";

interface SidebarProps {
  children: ReactNode;
}

export const iconStroke = "1.5px";
export const iconSize = 21;

const MainSidebarContent = () => {
  return (
    <nav
      className={cn(
        "fixed overflow-y-auto overflow-x-hidden border-r border-neutral-600 dark:border-neutral-800 md:pb-10",
        "md:left-0 md:top-0 md:h-full md:w-14",
        "bottom-0 h-14 w-full border-t"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center md:flex-col md:space-x-0 md:space-y-7 md:py-7",
          "space-x-6 py-4"
        )}
      >
        <Link href="/">
          <SidebarItem
            icon={<House width={22} />}
            label="Inicio"
          />
        </Link>
        <a>
          <SidebarItem
            icon={<Search strokeWidth={iconStroke} size={iconSize} />}
            label="Buscar"
          />
        </a>
        <ChangeTheme />
      </div>
    </nav>
  );
};

const Sidebar = (props: SidebarProps) => {
  return (
    <section className="min-h-screen">
      <MainSidebarContent />
      <main className={cn("ml-0 md:ml-14")}>{props.children}</main>
    </section>
  );
};

export default Sidebar;
