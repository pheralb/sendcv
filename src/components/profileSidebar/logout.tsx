"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import SidebarItem from "./sidebarItem";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button onClick={handleLogout}>
      <SidebarItem icon={<LogOut width={18} />}>Cerrar sesión</SidebarItem>
    </button>
  );
};

export default Logout;
