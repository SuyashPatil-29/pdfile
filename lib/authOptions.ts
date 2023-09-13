import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prismadb";
import { Session } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      // @ts-expect-error
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-expect-error
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export const getAuthSession = () =>
  getServerSession(authOptions) as Promise<Session | undefined | null>;
