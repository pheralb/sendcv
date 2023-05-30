import { getServerSession } from "next-auth";
import { prisma } from "../db";
import { authOptions } from "../auth";

export async function getOffersByUser() {
  const session = await getServerSession(authOptions);

  // Return all user data:
  const data = prisma.offers.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  if (!data) return null;

  return data;
}
