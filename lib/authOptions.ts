import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prismadb";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy:"jwt"
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
       if(!credentials?.email || !credentials?.password){
         return null
       }

       const existingUser = await db.user.findUnique({
        where:{email : credentials?.email}
       })

       if(!existingUser){
        return null
       }

       const passwordMatch = await compare(credentials.password, existingUser.password)
       if(!passwordMatch){
        return null
       }

       return {
        id: `${existingUser.id}`,
        email: existingUser.email,
        username: existingUser.username,
       }
      },
    }),
  ],
  callbacks : {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token, username : user.username
        }
      }
      
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username : token.username
        }
      }
    },
  }
};