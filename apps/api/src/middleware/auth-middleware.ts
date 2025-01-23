import type { MiddlewareHandler } from 'hono'
import { auth, cookieOptions } from '../lib/auth.js'
import { getCookie, setCookie } from 'hono/cookie'
import { subjects } from '@local/auth/subjects'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const accessToken = getCookie(c, "access_token")
    const refreshToken = getCookie(c, "refresh_token")

    if (accessToken) {
        const verified = await auth.verify(subjects, accessToken, {
            refresh: refreshToken,
        })

        if (!verified.err) {
            c.set('user', verified.subject.properties)
        }

        if (!verified.err && verified.tokens) {
            setCookie(c, "access_token", verified.tokens.access, cookieOptions)
            setCookie(c, "refresh_token", verified.tokens.refresh, cookieOptions)
        }
    }

    await next()
}

