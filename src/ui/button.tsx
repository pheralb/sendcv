import clsx from "clsx";
import type { ReactNode } from "react";
import Spinner from "./spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  loadingstatus?: boolean;
  loadingtext?: string;
  disabled?: boolean;
  wFull?: boolean;
}

export const ButtonStyles = clsx(
  "rounded-md border border-neutral-700 bg-neutral-700/50 px-4 py-2 font-medium text-white",
  "transition-all duration-200 ease-in-out",
  "hover:bg-neutral-800/60 hover:shadow-md",
  "outline-none focus:outline-none",
  "focus:ring-2 focus:ring-neutral-700 focus:ring-opacity-50"
);

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx(
        ButtonStyles,
        props.loadingstatus && "cursor-wait opacity-50",
        props.disabled && "cursor-not-allowed opacity-50",
        props.wFull && "w-full"
      )}
      disabled={props.disabled || props.loadingstatus}
      {...props}
    >
      <div className="flex items-center justify-center">
        {props.loadingstatus && (
          <Spinner className="mr-3 inline h-4 w-4 animate-spin text-white" />
        )}
        {props.icon && !props.loadingstatus && (
          <span className="mr-3">{props.icon}</span>
        )}
        <span>
          {props.loadingtext && props.loadingstatus
            ? props.loadingtext
            : props.children}
        </span>
      </div>
    </button>
  );
};
