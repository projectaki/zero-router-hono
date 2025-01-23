import { pgTable, text, timestamp, } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { users } from './users.js'
import { relations } from 'drizzle-orm'

export const items = pgTable('items', {
    id: text().primaryKey(),
    name: text().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
    userId: text()
        .references(() => users.id, { onDelete: 'cascade' }),
})

export const itemsRelations = relations(items, ({ one }) => ({
    user: one(users, {
        fields: [items.userId],
        references: [users.id],
    }),
}))

export const insertItemSchema = createInsertSchema(items)
export const selectItemSchema = createSelectSchema(items)
