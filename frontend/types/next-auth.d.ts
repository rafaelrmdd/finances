import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        userId: string
        githubId: string
        accessToken: string
        jwtToken: string
    }

    interface User {
        id: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string
        githubId: string
        accessToken: string
    }
}