import { new_id } from '@local/utils/id'
import { db } from './src/client.js'
import { items } from './src/schema/items.js'
import { users } from './src/schema/users.js'

async function run() {
    const [user] = await db.select().from(users)

    for (let i = 0; i < 50000; i++) {
        await db.insert(items).values({
            id: new_id(22),
            name: `Item ${i}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: user.id,
        })

        console.log(`Inserted item ${i}`)
    }


    await db.insert(items).values({
        id: new_id(22),
        name: `this is a hungariangoulaschleves`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
    })

}

run()
    .catch(console.error)
    .then(() => {
        console.log('done')
    }).finally(() => {
        process.exit(0)
    })
