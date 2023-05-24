import { z } from "zod";

export const experiencePostSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255).optional(),
  company: z.string().min(1).max(255),
  url: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
