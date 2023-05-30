"use client";
import type { ReactNode } from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider = (props: SessionProviderProps) => {
  return <NextAuthProvider>{props.children}</NextAuthProvider>;
};

export default SessionProvider;
