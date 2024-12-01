import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { PORT } from '@/constants/config'
import { router } from './router'

export const server = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'API is running 🚀')
;(async () => {
  await router()

  server.listen(PORT, ({ url }) => {
    console.log(`🦊 Elysia is running at ${url}`)
  })
})()
