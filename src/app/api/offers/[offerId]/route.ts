import { z } from "zod";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/server/db";

const routeContextSchema = z.object({
  params: z.object({
    offerId: z.string(),
  }),
});

// [DELETE] Delete offer saved for the authenticated user:
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

    await prisma.offers.delete({
      where: {
        id: params.offerId,
      },
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error || "Unknown error" }), {
      status: 500,
    });
  }
}
