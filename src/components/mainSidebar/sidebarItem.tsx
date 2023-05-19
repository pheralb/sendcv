import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { cn } from "@/utils/cn";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  border?: boolean;
  onClick?: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div
      className={cn(
        props.border && "border-b border-neutral-700 pb-4",
        "animate-in slide-in-from-left-2"
      )}
    >
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
    </div>
  );
};

export default SidebarItem;
