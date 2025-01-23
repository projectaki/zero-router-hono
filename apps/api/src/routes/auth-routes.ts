import { zValidator } from '@hono/zod-validator'
import { createJwt } from '@local/utils/jwt'
import { Hono } from 'hono'
import { z } from 'zod'
import { users } from '@local/db/schema/users'
import { eq } from 'drizzle-orm'
import { auth, cookieOptions } from '../lib/auth.js'
import { deleteCookie, setCookie } from 'hono/cookie'

export const authRoute = new Hono()
    .get('/user', async (c) => {
        const db = c.get('db')
        const user = c.get('user')

        console.log('USER', user)

        if (!user) {
            return c.json(null, 200)
        }

        const [userDb] = await db.select().from(users).where(eq(users.id, user.id))

        if (!userDb) {
            return c.json(null, 200)
        }

        const jwt = await createJwt(userDb.id)

        return c.json({
            id: userDb.id,
            email: userDb.email,
            jwt,
        })
    })
    .get(
        '/callback',
        zValidator(
            'query',
            z.object({
                code: z.string(),
                next: z.string().optional(),
            })
        ),
        async (c) => {
            const code = c.req.valid('query').code

            const next = c.req.valid('query').next

            const url = new URL(`${process.env.API_URL}/api/auth/callback`)
            // if (next) {
            //     url.searchParams.set('next', next)
            // }

            const exchanged = await auth.exchange(code, url.toString())

            if (exchanged.err) {
                console.error(exchanged.err)
                return c.json({ error: exchanged.err }, 400)
            }

            setCookie(c, "access_token", exchanged.tokens.access, cookieOptions)
            setCookie(c, "refresh_token", exchanged.tokens.refresh, cookieOptions)

            return c.redirect(next || `${process.env.APP_URL}`)
        }
    )
    .post('/logout', async (c) => {
        deleteCookie(c, "access_token")
        deleteCookie(c, "refresh_token")

        return c.redirect(`${process.env.APP_URL}`)
    })
