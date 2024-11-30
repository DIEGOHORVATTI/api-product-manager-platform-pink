import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { authRouter } from '@/routes/auth.routes'
import { userRouter } from '@/routes/user.routes'

import { PORT } from '@/constants/config'

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'API is running 🚀')
  .use(authRouter)
  .use(userRouter)
  .listen(PORT)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
