import type { MiddlewareHandler } from 'hono'
import { db } from '@local/db/client'

export const dbMiddleware: MiddlewareHandler = async (c, next) => {
    c.set('db', db)

    await next()
}
