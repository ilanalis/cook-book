import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [GitHub, GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })],
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
})