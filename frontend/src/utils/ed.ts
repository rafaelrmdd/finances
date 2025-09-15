import type { JWT, JWTEncodeParams, JWTDecodeParams } from "next-auth/jwt"
import jwt from "jsonwebtoken"

export async function encode({ secret, token }: JWTEncodeParams): Promise<string> {
  const cleanToken = {
    userId: token?.userId,
    githubId: token?.githubId,
    email: token?.email,
    name: token?.name,
    accessToken: token?.accessToken,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
  }

  return jwt.sign(cleanToken, secret, {
    algorithm: "HS256",
    header: {
      typ: "JWT",
      alg: "HS256",
      kid: "nextauth", // 👈 fixed, matches backend
    },
  })
}

export async function decode({ secret, token }: JWTDecodeParams): Promise<JWT | null> {
  try {
    return jwt.verify(token!, secret, {
      algorithms: ["HS256"],
    }) as JWT
  } catch (err) {
    console.error("JWT decode error:", err)
    return null
  }
}