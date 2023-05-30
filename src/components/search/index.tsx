"use client";

import type { User } from "@prisma/client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/command";

import SidebarItem from "../mainSidebar/sidebarItem";
import { iconSize } from "../mainSidebar/sidebar";

import {
  FileText,
  GithubIcon,
  MoonIcon,
  SunIcon,
  TwitterIcon,
  UserCircle,
} from "lucide-react";
import Search from "@/ui/icons/search";
import House from "@/ui/icons/house";
import { getSingleUser } from "@/server/services/getSingleUser";

const SearchDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleRoute = (route: string) => {
    router.push(route);
    setOpen(false);
  };

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <SidebarItem icon={<Search width={iconSize} />} label="Buscar" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Escribe para buscar..."
          value={search}
          onValueChange={setSearch}
          autoFocus
        />
        <CommandList>
          <CommandEmpty>
            No se encontraron resultados para <strong>{search}</strong>.
          </CommandEmpty>
          <CommandGroup heading="General">
            <CommandItem onSelect={() => handleRoute("/")}>
              <div className="flex items-center space-x-3">
                <House
                  width={iconSize}
                  className="text-neutral-700 dark:text-neutral-400"
                />
                <span>Explorar</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleRoute("/dashboard")}>
              <div className="flex items-center space-x-3">
                <UserCircle
                  width={iconSize}
                  className="text-neutral-700 dark:text-neutral-400"
                />
                <span>Mi perfil</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleRoute("/dashboard/offers")}>
              <div className="flex items-center space-x-3">
                <FileText
                  width={iconSize}
                  className="text-neutral-700 dark:text-neutral-400"
                />
                <span>Mis ofertas</span>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Ajustes">
            <CommandItem onSelect={() => handleChangeTheme()}>
              <div className="flex items-center space-x-3">
                {theme === "light" ? (
                  <SunIcon
                    size={iconSize}
                    className="text-neutral-700 dark:text-neutral-400"
                  />
                ) : (
                  <MoonIcon
                    size={iconSize}
                    className="text-neutral-700 dark:text-neutral-400"
                  />
                )}
                <span>Modo {theme === "light" ? "oscuro" : "claro"}</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => handleRoute("https://github.com/pheralb/sendcv")}
            >
              <div className="flex items-center space-x-3">
                <GithubIcon
                  width={iconSize}
                  className="text-neutral-700 dark:text-neutral-400"
                />
                <span>Repositorio</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => handleRoute("https://twitter.com/pheralb_")}
            >
              <div className="flex items-center space-x-3">
                <TwitterIcon
                  width={iconSize}
                  className="text-neutral-700 dark:text-neutral-400"
                />
                <span>Twitter</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchDialog;
