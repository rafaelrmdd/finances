import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { JWT } from "next-auth/jwt"
import { SignJWT, jwtVerify } from "jose"
import { useContext } from "react"
import { UserContext } from "../../../../../context/UserProvider"

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const handler = NextAuth({
    
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    // pages: {
    //     signIn: '/auth/signIn'
    // },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 2,
    },  
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: false,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 2
            }
        },
    },
    jwt: {
        maxAge: 60 * 60 * 2,
        secret: process.env.NEXTAUTH_SECRET,
        encode: async ({ secret, token }) => {
            if (!token) return ""
            return await new SignJWT(token as any)
                .setProtectedHeader({ alg: "HS256" })
                .sign(new TextEncoder().encode(secret as string))
        },
        decode: async ({ secret, token }) => {
            if (!token) return null
            const { payload } = await jwtVerify(token, new TextEncoder().encode(secret as string))
            return payload as JWT
        },
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.userId = user.id
                token.githubId = user.id

                if (account) {
                    token.accessToken = account.access_token!
                }

            }

            return token
        },
        async session({ session, token }) {
            session.userId = token.userId;
            session.githubId = token.githubId
            session.accessToken = token.accessToken

            return session
        },
        async signIn({ user }) {
            if (!user.email) {
                console.log('Email is empty!');
                return false;
            }

            try {
                await fetch(`https://localhost:5185/api/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                    }),
                });

                return true;
            } catch (error) {
                console.error('Error while comunicating with the backend:', error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }
