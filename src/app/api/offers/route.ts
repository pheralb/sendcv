import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { offerPostSchema } from "@/server/schemas/offerPostSchema";

// [CREATE] Save new offer.
// ---------------------------------------
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = offerPostSchema.parse(json);
    const { user } = session;

    const newOfferSaved = await prisma.offers.create({
      data: {
        title: body.title,
        infojobsUrl: body.infojobsUrl || "",
        author: body.author,
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(newOfferSaved));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}

// [DELETE] Save new offer.
// ---------------------------------------
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = offerPostSchema.parse(json);

    const newOfferDeleted = await prisma.offers.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(newOfferDeleted));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}
