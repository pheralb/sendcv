import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

// Adapter:
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Providers:
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Callbacks:
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.description = token.description;
        session.user.website = token.website;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        token.id = user?.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        email: dbUser.email,
        image: dbUser.image,
        description: dbUser.description,
        website: dbUser.website,
      };
    },
  },
  // Providers:
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  // Pages:
  pages: {
    signIn: "/auth",
  },
  // Session:
  session: {
    strategy: "jwt",
  },
  // Database:
  adapter: PrismaAdapter(prisma),
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
