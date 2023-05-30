"use client";
import type { Metadata } from "next";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { signIn } from "next-auth/react";

import { Button } from "@/ui/button";
import { toast } from "sonner";
import { GithubIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Auth - Sendcv",
};

const Page = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: string) => {
    setLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: `/dashboard`,
      });
    } catch (error) {
      toast.error("Unable to log in. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center animate-in fade-in-5"
      )}
    >
      <h2 className="mb-2 text-2xl">Iniciar sesión</h2>
      <Button
        icon={<GithubIcon width={20} />}
        onClick={() => handleLogin("github")}
        loadingstatus={loading}
      >
        <span>Continuar con Github</span>
      </Button>
    </div>
  );
};

export default Page;
