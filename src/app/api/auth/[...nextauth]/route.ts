import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

if (!githubId || !githubSecret) {
  console.warn('Missing GitHub OAuth credentials. Authentication will be disabled.');
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: githubId ?? "",
      clientSecret: githubSecret ?? "",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST }