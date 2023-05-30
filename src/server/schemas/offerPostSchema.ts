import { z } from "zod";

export const offerPostSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  author: z.string().min(1),
  infojobsUrl: z.string().optional(),
});
