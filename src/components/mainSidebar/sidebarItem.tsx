import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <TooltipProvider delayDuration={0.2}>
      <Tooltip>
        <TooltipTrigger
          className="transition-transform duration-150 focus:scale-105"
          asChild
          onClick={props.onClick}
        >
          {props.icon}
        </TooltipTrigger>
        <TooltipContent
          side="left"
          sideOffset={12}
          className="text-[12px]"
          aria-label={props.label}
        >
          <p>{props.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItem;
