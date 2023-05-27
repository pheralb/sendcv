import { z } from "zod";
import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { experiencePostSchema } from "@/server/schemas/experiencePostSchema";

const routeContextSchema = z.object({
  params: z.object({
    experienceId: z.string(),
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
    const body = experiencePostSchema.parse(json);

    const newDescriptionUpdate = await prisma.userExperience.update({
      where: {
        id: params.experienceId,
      },
      data: {
        title: body.title,
        company: body.company,
        url: body.url || "",
        location: body.location || "",
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description,
      },
    });

    return new Response(JSON.stringify(newDescriptionUpdate));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}

// [DELETE] Delete experience data for the authenticated user:
// ---------------------------------------
export async function DELETE(
  _req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    await prisma.userExperience.delete({
      where: {
        id: params.experienceId,
      },
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}
