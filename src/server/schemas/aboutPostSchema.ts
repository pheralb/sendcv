import { z } from "zod";

export const aboutPostSchema = z.object({
  description: z.string().max(500).optional(),
});