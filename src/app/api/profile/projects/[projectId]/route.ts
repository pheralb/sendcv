import { z } from "zod";
import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { projectPostSchema } from "@/server/schemas/projectPostSchema";

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
});

// [UPDATE] Update experience data for the authenticated user:
// ---------------------------------------
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = projectPostSchema.parse(json);

    const newProjectUpdate = await prisma.projects.update({
      where: {
        id: params.projectId,
      },
      data: {
        title: body.title,
        description: body.description,
        url: body.url || "",
        repository: body.repository || "",
      },
    });

    return new Response(JSON.stringify(newProjectUpdate));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}
