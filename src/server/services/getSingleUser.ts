import { prisma } from "../db";

export async function getSingleUser(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}
