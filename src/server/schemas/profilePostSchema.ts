import { z } from "zod";

export const profilePostSchema = z.object({
  name: z.string().min(1).max(255),
  website: z.string().max(255).optional(),
  twitterUrl: z.string().max(255).optional(),
  linkedinUrl: z.string().max(255).optional(),
});
