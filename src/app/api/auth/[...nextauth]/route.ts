import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
        console.warn("GitHub OAuth credentials are missing. Authentication will not work.");
        return false;
      }
      return true;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }