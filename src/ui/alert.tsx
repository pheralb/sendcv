import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  color: "warn" | "error" | "success";
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={cn(
        "p-3 rounded-md text-sm font-medium",
        props.color === "warn" && "bg-yellow-400/10",
        props.color === "error" && "bg-red-400/10",
        props.color === "success" && "bg-green-400/10"
      )}
    >
      {props.children}
    </div>
  );
};

export default Alert;
