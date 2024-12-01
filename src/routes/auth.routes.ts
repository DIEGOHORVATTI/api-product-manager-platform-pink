import Elysia from 'elysia'

import { UserSchema } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'
import { signService } from '@/services/auth/sign'

import { server } from '..'

const router = new Elysia({ prefix: '/auth' })
  .use(server)
  .use(jwtSettings)
  .post(
    '/login',
    async ({ body, jwt }) => {
      const user = await signService(body)

      const token = await jwt.sign({ id: user?.id })

      return { token }
    },
    UserSchema
  )

export default router
