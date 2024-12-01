import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { PORT } from '@/constants/config'

import { readdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const app = new Elysia()

const routesPath = join(__dirname, 'routes')

const routerModules = readdirSync(routesPath)

;(async () => {
  for (const routerModule of routerModules) {
    const modulePath = join(routesPath, routerModule)

    try {
      const route = await import(modulePath)

      const router = route.default // Acesse a exportação padrão

      if (!router || typeof router.group !== 'function') {
        console.error(`Roteador inválido no módulo: ${routerModule}`)
        continue
      }

      const { name } = parse(routerModule)

      // Adiciona o grupo ao app
      app.group(`/${name}`, router)
    } catch (error) {
      console.error(`Erro ao carregar módulo ${routerModule}:`, error)
    }
  }

  app
    .use(cors())
    .use(swagger())
    .get('/', () => 'API is running 🚀')
    .listen(PORT)

  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
})()
