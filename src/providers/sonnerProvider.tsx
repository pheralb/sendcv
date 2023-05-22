import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface SonnerProviderProps {
  children: ReactNode;
}

const SonnerProvider = (props: SonnerProviderProps) => {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
};

export default SonnerProvider;
