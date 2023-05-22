import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";

// Get all offers for the authenticated user:
// --------------------------
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const offers = await prisma.offers.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      where: {
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(offers));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
