import Elysia from 'elysia'

import { UserSchema } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'
import { signService } from '@/services/auth/sign'

export const RouteUsers = (app: Elysia) =>
  app.use(jwtSettings).group('/auth', users => {
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
