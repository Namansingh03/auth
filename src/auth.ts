import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { SignInSchema } from "./schemas/authSchema";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user || !user.password) return null;

          const PasswordMatch = await bcrypt.compare(password, user.password);

          if (PasswordMatch) return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await prisma.user.findFirst({
        where: { id: user.id },
      });

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token}) {
      return token;
    },
  },
});
