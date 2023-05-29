import * as React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const inputClass = cn(
  "border-neutral-400 dark:border-neutral-600 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputClass, className)}
        autoComplete="off"
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(inputClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { Input, TextArea };
