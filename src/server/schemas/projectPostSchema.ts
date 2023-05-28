import { z } from "zod";

export const projectPostSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  url: z.string().max(255).optional(),
  repository: z.string().max(255).optional(),
});
