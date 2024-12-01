import { Elysia, t as Type } from 'elysia'

import { UserSchema } from '@/models/User'

import { signService } from '@/services/auth/sign'
import { registerService } from '@/services/auth/register'
import { recoverPasswordService } from '@/services/auth/recover-password'

import { jwtSettings } from '@/shared/jwt-settings'

const router = new Elysia().group('/auth', server =>
  server
    .use(jwtSettings)
    .post(
      '/login',
      async ({ body, jwt }) => {
        const user = await signService(body)

        const token = await jwt.sign({ id: user.id })

        return { token }
      },
      UserSchema
    )
    .post(
      '/register',
      async ({ body }) => {
        const user = await registerService(body)

        return { message: 'User registered successfully', user }
      },
      UserSchema
    )
    .post(
      '/recover-password',
      async ({ body: { email } }) => {
        await recoverPasswordService(email)

        return { message: 'Recovery email sent successfully' }
      },
      {
        body: Type.Object({
          email: Type.String({ format: 'email' })
        })
      }
    )
)

export default router
