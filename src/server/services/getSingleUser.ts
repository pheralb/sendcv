import { prisma } from "../db";

export async function getSingleUser(username: string) {
  // Return all user data:
  const user = prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      experiences: true,
    },
  });

  if (!user) return null;

  return user;
}
