"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-neutral-300 dark:bg-neutral-800 px-3 py-1.5 animate-in fade-in-50",
      "data-[side=top]:slide-in-from-bottom-1",
      "data-[side=bottom]:slide-in-from-top-1",
      "data-[side=left]:slide-in-from-right-0.5",
      "data-[side=right]:slide-in-from-left-1",
      "opacity-100",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
