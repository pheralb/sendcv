"use client";

import Avatar from "boring-avatars";
import { useSession } from "next-auth/react";

import SidebarItem from "../mainSidebar/sidebarItem";
import { iconSize } from "../mainSidebar/sidebar";
import { Link } from "@/ui/link";

const AuthForSidebar = () => {
  const session = useSession();

  return session.data?.user ? (
    <Link href="/dashboard">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={session.data.user.image}
        alt={session.data.user.name}
        className="h-6 rounded-full"
      />
    </Link>
  ) : (
    <Link href="/auth">
      <SidebarItem
        icon={<Avatar size={iconSize} name="Iniciar sesión" variant="beam" />}
        label="Iniciar sesión"
      />
    </Link>
  );
};

export default AuthForSidebar;
