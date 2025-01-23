import { hc } from 'hono/client'
import type { ApiType } from '@local/api'

export const { api } = hc<ApiType>('/')
