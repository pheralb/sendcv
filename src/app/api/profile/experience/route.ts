import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { experiencePostSchema } from "@/server/schemas/experiencePostSchema";

// [POST] Create a new experience for the authenticated user:
// ---------------------------------------
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = experiencePostSchema.parse(json);
    const { user } = session;

    const newDescriptionUpdate = await prisma.userExperience.create({
      data: {
        title: body.title,
        description: body.description || "",
        company: body.company,
        url: body.url || "",
        location: body.location || "",
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        authorId: user.id as string,
      },
    });

    return new Response(JSON.stringify(newDescriptionUpdate));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}