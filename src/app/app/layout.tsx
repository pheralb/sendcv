import { Star, UserCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/ui/link";

import SidebarItem from "@/components/profileSidebar/sidebarItem";
import Logout from "@/components/profileSidebar/logout";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="fixed h-full w-56 overflow-y-auto overflow-x-hidden border-r border-neutral-300 pb-10 dark:border-neutral-800">
      <div className="flex flex-col px-5 py-5">{children}</div>
    </nav>
  );
};

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <LayoutContent>
        <div className="flex flex-col space-y-2">
          <Link href="/app">
            <SidebarItem icon={<UserCircle width={18} />}>
              Tu perfil
            </SidebarItem>
          </Link>
          <Link href="/app/offers">
            <SidebarItem icon={<Star width={18} />}>Ofertas</SidebarItem>
          </Link>
          <Logout />
        </div>
      </LayoutContent>
      <div className="ml-56">{children}</div>
    </div>
  );
};

export default Layout;
