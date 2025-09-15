import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import jwt from "jsonwebtoken"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encode: async ({ secret, token }) => {
      const cleanToken = {
        userId: token?.userId,
        githubId: token?.githubId,
        email: token?.email,
        name: token?.name,
        accessToken: token?.accessToken,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
      }

      return jwt.sign(cleanToken, secret, {
        algorithm: "HS256",
        header: {
          typ: "JWT",
          alg: "HS256",
          kid: "nextauth", // 👈 fixed, safe kid
        },
      })
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token!, secret, {
        algorithms: ["HS256"],
      })
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id
        token.githubId = user.id
      }
      if (account) {
        token.accessToken = account.access_token!
      }
      return token
    },
    async session({ session, token }) {
      session.userId = token.userId
      session.githubId = token.githubId
      session.accessToken = token.accessToken
      return session
    },
  },
})

export { handler as GET, handler as POST }