import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  // Server environment variables:
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    INFOJOBS_CLIENT_ID: z.string(),
    INFOJOBS_CLIENT_SECRET: z.string(),
    INFOJOBS_TOKEN: z.string(),
  },

  // Client environment variables:
  client: {},

  // Runtime environment variables:
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    INFOJOBS_CLIENT_ID: process.env.INFOJOBS_CLIENT_ID,
    INFOJOBS_CLIENT_SECRET: process.env.INFOJOBS_CLIENT_SECRET,
    INFOJOBS_TOKEN: process.env.INFOJOBS_TOKEN,
  },
});
