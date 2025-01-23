import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as items from './schema/items.js'
import * as users from './schema/users.js'

const connectionString = process.env.DATABASE_URL!

const client = postgres(connectionString)

export const db = drizzle(client, {
  schema: { ...items, ...users },
  logger: true,
})