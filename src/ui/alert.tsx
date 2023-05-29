import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  color: "warn" | "error" | "success" | "tip";
  emoji?: string;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={cn(
        "rounded-md p-3 text-sm font-medium",
        props.color === "warn" && "bg-yellow-500/20 dark:bg-yellow-400/10",
        props.color === "error" && "bg-red-500/20 dark:bg-red-400/10",
        props.color === "success" && "bg-green-500/20 dark:bg-green-400/10",
        props.color === "tip" && "bg-neutral-500/20 dark:bg-neutral-400/10"
      )}
    >
      <div className="flex items-center space-x-1">
        {props.color === "tip" && <span>{props.emoji ?? "✨"}</span>}
        <span>{props.children}</span>
      </div>
    </div>
  );
};

export default Alert;
