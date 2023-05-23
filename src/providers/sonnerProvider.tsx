"use client"

import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface SonnerProviderProps {
  children: ReactNode;
}

const SonnerProvider = (props: SonnerProviderProps) => {
  return (
    <>
      {props.children}
      <Toaster theme="dark" position="bottom-center" />
    </>
  );
};

export default SonnerProvider;
