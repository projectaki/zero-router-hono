import { createClient } from "@openauthjs/openauth/client"
import type { CookieOptions } from "hono/utils/cookie"

export const auth = createClient({
    clientID: "@local/api",
    issuer: process.env.AUTH_URL,
})

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
}