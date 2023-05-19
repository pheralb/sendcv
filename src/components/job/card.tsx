import React from "react";
import type { Offer } from "@/types/offer";
import { Compass } from "lucide-react";

const JobCard = (props: Offer) => {
  return (
    <div className="w-full rounded border border-neutral-300 dark:border-neutral-700 p-6">
      <h3 className="font-medium mb-2">{props.title}</h3>
      <div className="flex items-center space-x-2">
        <Compass size={14} strokeWidth={1.5} />
        <p className="text-md text-neutral-600 dark:text-neutral-400">
          {props.province}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
