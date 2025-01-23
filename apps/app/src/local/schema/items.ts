import { createTableSchema } from '@rocicorp/zero'
import { usersSchema } from './users'

export const itemsSchema = createTableSchema({
    tableName: 'items',
    columns: {
        id: 'string',
        name: 'string',
        createdAt: 'number',
        updatedAt: 'number',
        userId: 'string',
    },
    primaryKey: 'id',
    relationships: {
        user: {
            sourceField: 'userId',
            destSchema: usersSchema,
            destField: 'id',
        }
    }
})