import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { aboutPostSchema } from "@/server/schemas/aboutPostSchema";

// [POST] Update about me info for the authenticated user:
// ---------------------------------------
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = aboutPostSchema.parse(json);
    const { user } = session;

    const newDescriptionUpdate = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
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