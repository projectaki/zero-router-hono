import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { createInsertSchema } from 'drizzle-zod'
import { relations } from 'drizzle-orm'
import { items } from './items.js'
import { new_id } from '@local/utils/id'

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => new_id(22)),
    email: text('email').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdateFn(() => new Date())
});

export const usersRelations = relations(users, ({ one, many }) => ({
    items: many(items),
}))

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
