import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { PORT } from '@/constants/config'

export const server = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'API is running 🚀')

server.listen(PORT, ({ url }) => {
  console.log(`🦊 Elysia is running at ${url}`)
})
