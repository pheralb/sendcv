"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

import SidebarItem from "./mainSidebar/sidebarItem";
import { Heart, X } from "lucide-react";
import { iconSize, iconStroke } from "./mainSidebar/sidebar";
import { ExternalLink } from "@/ui/link";

const About = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <SidebarItem
          icon={
            open ? (
              <X
                size={iconSize}
                className="animate-in slide-in-from-left-1"
                aria-label="Close Popover"
              />
            ) : (
              <Heart
                strokeWidth={iconStroke}
                size={iconSize}
                aria-label="Acerca de"
              />
            )
          }
          label="Acerca de"
        />
      </PopoverTrigger>
      <PopoverContent
        side="left"
        sideOffset={12}
        className="w-auto text-[13px]"
      >
        <div className="mb-4 flex flex-col space-y-2 border-b border-neutral-400 pb-3 dark:border-neutral-700">
          <ExternalLink href="https://midu.dev" externalIcon={true}>
            midudev Hackathon 2023
          </ExternalLink>
          <ExternalLink href="https://infojobs.net" externalIcon={true}>
            Infojobs
          </ExternalLink>
        </div>
        <div className="flex items-center space-x-2">
          <Heart size={13} className="text-red-600 dark:text-red-200" />
          <ExternalLink href="https://twitter.com/pheralb_" externalIcon={true}>
            Built by pheralb
          </ExternalLink>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default About;
