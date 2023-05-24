import { ExternalLink } from "@/ui/link";
import type { ReactNode } from "react";

import CreateUpdateExperience from "../profilePage/createUpdateExperience";

const TimelineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ol className="relative ml-1 space-y-5 border-l border-gray-200 dark:border-neutral-700">
      {children}
    </ol>
  );
};

interface TimelineItemProps {
  date?: Date | null;
  edit?: boolean;
  title: string;
  company?: string;
  url: string;
  description: string;
}

const TimelineItem = (props: TimelineItemProps) => {
  return (
    <li className="ml-5 pt-1">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-neutral-900 dark:bg-neutral-700"></div>
      <time className="mb-2 mt-3 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"></time>
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-neutral-900 dark:text-white">
          {props.title}
        </h3>
        {props.edit && <CreateUpdateExperience status="edit" {...props} />}
      </div>
      <div className="flex items-center space-x-2">
        <ExternalLink
          href={props.url}
          externalIcon={true}
          className="text-md font-normal text-neutral-500 dark:text-neutral-400"
        >
          {props.company}
        </ExternalLink>
        <span>-</span>
        <p className="text-md font-normal text-neutral-500 dark:text-neutral-400">
          {props.description}
        </p>
      </div>
    </li>
  );
};

export { TimelineProvider, TimelineItem };
