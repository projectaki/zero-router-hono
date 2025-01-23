import { Hono } from 'hono'
import { authMiddleware } from './middleware/auth-middleware.js'
import { serve } from "@hono/node-server"
import { db } from '@local/db/client'
import { dbMiddleware } from './middleware/db-middleware.js'
import { subjects } from '@local/auth/subjects'
import type { z } from 'zod'
import { authRoute } from './routes/auth-routes.js'

declare module 'hono' {
  interface ContextVariableMap {
    user: z.infer<typeof subjects.user> | null,
    db: typeof db
  }
}

const api = new Hono()
  .basePath('/api')
  .use(dbMiddleware)
  .use(authMiddleware)
  .route('/auth', authRoute)
  .get('/health', (c) => {
    return c.text('OK', 200)
  })

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: api.fetch,
  port
})

export type ApiType = typeof api