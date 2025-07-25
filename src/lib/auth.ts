import NextAuth from "next-auth";
import Googlge from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Googlge({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT callback", { token, account, user });
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback", { session, token });
      if (token) {
        session.accessToken = token.accessToken as string;
        session.provider = token.provider as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", {
        user,
        account,
        profile,
      });
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});
