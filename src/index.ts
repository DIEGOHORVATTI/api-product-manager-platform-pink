import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { readdirSync } from 'fs'
import { join } from 'path'

import { PORT } from '@/constants/config'

const routesPath = join(__dirname, 'routes')
const routeFiles = readdirSync(routesPath)

const server = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'API is running 🚀')

;(async () => {
  for (const file of routeFiles) {
    if (file.endsWith('.routes.ts')) {
      const { default: router } = await import(join(routesPath, file))

      server.use(router)
    }
  }

  server.listen(PORT, ({ url }) => {
    console.log(`🦊 Elysia is running at ${url}`)
  })
})()
