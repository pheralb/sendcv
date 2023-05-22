import React from "react";
import { Link } from "@/ui/link";
import Avatar from "boring-avatars";

import SidebarItem from "../mainSidebar/sidebarItem";
import { iconSize } from "../mainSidebar/sidebar";

const AuthForSidebar = () => {
  return (
    <Link href="/auth">
      <SidebarItem
        icon={<Avatar size={iconSize} name="Iniciar sesión" variant="beam" />}
        label="Iniciar sesión"
      />
    </Link>
  );
};

export default AuthForSidebar;
