import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { readdirSync } from 'fs'
import { join } from 'path'

import { PORT } from '@/constants/config'

const server = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'API is running 🚀')

const routesPath = join(__dirname, 'routes')
readdirSync(routesPath).forEach(async file => {
  if (file.endsWith('.routes.ts')) {
    const routeModule = await import(join(routesPath, file))

    server.use(routeModule.default)
  }
})

server.listen(PORT, ({ url }) => {
  console.log(`🦊 Elysia is running at ${url}`)
})
