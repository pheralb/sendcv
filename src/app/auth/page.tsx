"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGithub = async () => {
    setIsLoading(true);
    //router.push("/api/oauth?provider=github");
  };

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center animate-in fade-in-5"
      )}
    >
      <h2 className="mb-2 text-2xl">Iniciar sesión</h2>
      <a href="/api/oauth?provider=github" className="button">
				Continue with Github
			</a>
    </div>
  );
};

export default Page;
