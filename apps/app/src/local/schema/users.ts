import { createTableSchema } from '@rocicorp/zero'

export const usersSchema = createTableSchema({
    tableName: 'users',
    columns: {
        id: 'string',
    },
    primaryKey: 'id'
})