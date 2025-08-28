import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/definitions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      authorize: async (
        credentials: Partial<Record<string, unknown>> | undefined
      ): Promise<{ id: string; email: string } | null> => {
        if (!credentials?.email || !credentials?.password) return null;
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.profile.findUnique({ where: { email } });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
