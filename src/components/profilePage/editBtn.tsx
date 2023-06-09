import React from "react";
import { Edit } from "lucide-react";
import { cn } from "@/utils/cn";

interface EditBtnProps {
  color?: string;
  border?: boolean;
}

const EditBtn = (props: EditBtnProps) => {
  return (
    <div
      className={cn(
        "rounded-full p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-75 transition-colors",
        props.border && "border border-neutral-700"
      )}
    >
      <Edit
        width={14}
        height={14}
        className={props.color || "dark:text-yellow-200"}
      />
    </div>
  );
};

export default EditBtn;
