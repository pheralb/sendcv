import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { projectPostSchema } from "@/server/schemas/projectPostSchema";

// [CREATE] Create a new project for the authenticated user:
// ---------------------------------------
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = projectPostSchema.parse(json);
    const { user } = session;

    const newProject = await prisma.projects.create({
      data: {
        title: body.title,
        description: body.description,
        url: body.url || "",
        repository: body.repository || "",
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(newProject));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}