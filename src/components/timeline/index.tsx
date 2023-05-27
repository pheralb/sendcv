import { ExternalLink } from "@/ui/link";
import type { ReactNode } from "react";

import CreateUpdateExperience from "../profilePage/createUpdateExperience";
import DeleteExperience from "../profilePage/deleteExperience";

const TimelineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ol className="relative ml-1 space-y-5 border-l border-gray-200 dark:border-neutral-700">
      {children}
    </ol>
  );
};

interface TimelineItemProps {
  id?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  edit?: boolean;
  title: string;
  company?: string;
  url: string;
  description: string;
}

const TimelineItem = (props: TimelineItemProps) => {
  return (
    <li className="ml-5 pt-1">
      <div className="absolute -left-1.5 mt-8 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-neutral-900 dark:bg-neutral-700"></div>
      <time className="mb-2 mt-3 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"></time>
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {props.startDate && (
              <time>
                {props.startDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </time>
            )}
            <span>-</span>
            {props.endDate ? (
              <time>
                {props.endDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </time>
            ) : (
              <span>Present</span>
            )}
          </div>
          <h3 className="text-lg text-neutral-900 dark:text-white">
            {props.title}
          </h3>
        </div>
        {props.edit && (
          <div className="flex items-center space-x-1">
            <CreateUpdateExperience status="edit" {...props} />
            <DeleteExperience id={props.id!} />
          </div>
        )}
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
