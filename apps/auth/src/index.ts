import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { subjects } from "./subjects.js"
import { serve } from "@hono/node-server"
import { PasswordUI } from "@openauthjs/openauth/ui/password"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { db } from "@local/db/client"
import { users } from "@local/db/schema/users"
import { eq } from "drizzle-orm"

async function getUserOrProvision(email: string) {
    let [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
        const [res] = await db.insert(users).values({ email }).returning()
        user = res
    }

    if (!user) {
        throw new Error("User not found")
    }

    return user
}

const app = issuer({
    subjects,
    storage: MemoryStorage({
        persist: process.env.AUTH_PERSIST_PATH
    }),
    providers: {
        code: CodeProvider(
            CodeUI({
                sendCode: async (email, code) => {
                    console.log(email, code)
                },
            }),
        ),
        password: PasswordProvider(
            PasswordUI({
                sendCode: async (email, code) => {
                    console.log(email, code)
                },
            })
        )
    },
    success: async (ctx, value) => {
        if (value.provider === "code") {
            const user = await getUserOrProvision(value.claims.email!)

            return ctx.subject("user", {
                id: user.id,
                email: user.email,
            })
        }

        if (value.provider === "password") {
            const user = await getUserOrProvision(value.email!)
            return ctx.subject("user", {
                id: user.id,
                email: user.email,
            })
        }

        throw new Error("Invalid provider")
    },
})

const port = 3005
console.log(`Server is running on http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port
})
