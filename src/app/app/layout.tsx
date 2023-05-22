import { LogOut, Star, UserCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/ui/link";

import { getCurrentUser } from "@/server/services/getCurrentUser";
import { notFound } from "next/navigation";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="fixed h-full w-56 overflow-y-auto overflow-x-hidden border-r border-neutral-800 pb-10">
      <div className="flex flex-col px-5 py-5">{children}</div>
    </nav>
  );
};

const LayoutItem = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="flex cursor-pointer items-center space-x-3 rounded-md p-2 duration-75 hover:bg-neutral-800">
      {icon}
      <span>{children}</span>
    </div>
  );
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }
  return (
    <div className="min-h-screen">
      <LayoutContent>
        <h2 className="mb-5 text-xl font-medium">{user.name}</h2>
        <div className="flex flex-col space-y-2">
          <Link href="/app">
            <LayoutItem icon={<UserCircle width={18} />}>Tu perfil</LayoutItem>
          </Link>
          <Link href="/app/offers">
            <LayoutItem icon={<Star width={18} />}>Ofertas</LayoutItem>
          </Link>
          <Link href="/api/oauth/logout">
            <LayoutItem icon={<LogOut width={18} />}>Cerrar sesión</LayoutItem>
          </Link>
        </div>
      </LayoutContent>
      <div className="ml-56">{children}</div>
    </div>
  );
};

export default Layout;
