import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { prisma } from "../db";

export async function getCurrentAuthUser() {
  const session = await getServerSession(authOptions);

  // Return all user data:
  const user = prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      experiences: true,
      Projects: true,
    },
  });

  if (!user) return null;

  return user;
}
