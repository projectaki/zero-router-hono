import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './dist/schema',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL_LOCAL!,
  },
})
