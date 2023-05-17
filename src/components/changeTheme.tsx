"use client";

import { useTheme } from "next-themes";
import SidebarItem from "./mainSidebar/sidebarItem";
import { SunIcon, MoonIcon } from "lucide-react";

// Icon Size & Stroke from main sidebar:
import { iconSize, iconStroke } from "./mainSidebar/sidebar";

const ChangeTheme = () => {
  const { setTheme, theme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <SidebarItem
        icon={
          theme === "light" ? (
            <SunIcon strokeWidth={iconStroke} size={iconSize} />
          ) : (
            <MoonIcon strokeWidth={iconStroke} size={iconSize} />
          )
        }
        label={theme === "light" ? "Dark Mode" : "Light Mode"}
      />
    </button>
  );
};

export default ChangeTheme;
