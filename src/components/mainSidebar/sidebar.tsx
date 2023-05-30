import type { ReactNode } from "react";
import { Link } from "@/ui/link";
import { cn } from "@/utils/cn";

import House from "@/ui/icons/house";

import SidebarItem from "./sidebarItem";
import ChangeTheme from "../changeTheme";
import AuthForSidebar from "../auth/forSidebar";
import About from "../about";
import SearchDialog from "../search";

interface SidebarProps {
  children: ReactNode;
}

export const iconStroke = "1.5px";
export const iconSize = 21;

const MainSidebarContent = () => {
  return (
    <nav
      className={cn(
        "fixed z-50 overflow-y-auto overflow-x-hidden bg-neutral-200/75 dark:bg-neutral-900 md:pb-10",
        "md:left-0 md:top-0 md:h-full md:w-14",
        "bottom-0 h-14 w-full",
        "border-t border-neutral-300 dark:border-neutral-800 md:border-r"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center md:flex-col md:space-x-0 md:space-y-7 md:py-7",
          "space-x-6 py-4 pb-3"
        )}
      >
        <Link href="/">
          <SidebarItem icon={<House width={22} />} label="Inicio" />
        </Link>
        <SearchDialog />
        {/* <ChangeTheme /> */}
        <About />
        <AuthForSidebar />
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
