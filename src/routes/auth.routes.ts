import Elysia from 'elysia'

import { UserSchema } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'
import { signService } from '@/services/auth/sign'
import { server } from '..'

const app = new Elysia()
  .use(server)
  .use(jwtSettings)
  .group('/auth', users => {
    return users.post(
      '/login',
      async ({ body, jwt }) => {
        const user = await signService(body)

        const token = await jwt.sign({ id: user?.id })

        return { token }
      },
      UserSchema
    )
  })
