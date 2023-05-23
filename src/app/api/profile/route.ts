import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { profilePostSchema } from "@/server/schemas/profilePostSchema";

// [POST] Update profile info for the authenticated user:
// ---------------------------------------
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = profilePostSchema.parse(json);
    const { user } = session;
    
    const newProfileUpdate = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        name: body.name,
        website: body.website,
      },
    });

    return new Response(JSON.stringify(newProfileUpdate));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error || "Unknown error" }),
      { status: 500 }
    );
  }
}
