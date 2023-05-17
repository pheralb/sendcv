import type { ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/utils/cn";
import { ArrowUpRightIcon } from "lucide-react";

interface GlobalLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  externalIcon?: boolean;
  underline?: boolean;
  className?: string;
}

const Link = (props: GlobalLinkProps) => {
  return <NextLink href={props.href}>{props.children}</NextLink>;
};

const ExternalLink = (props: GlobalLinkProps) => {
  return (
    <a
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className={cn(
        props.underline && "underline",
        "hover:underline",
        props.className
      )}
    >
      <div className="flex items-center">
        {props.children}
        {props.externalIcon && (
          <ArrowUpRightIcon className="ml-1" size={15} strokeWidth={2} />
        )}
      </div>
    </a>
  );
};

export { Link, ExternalLink };
