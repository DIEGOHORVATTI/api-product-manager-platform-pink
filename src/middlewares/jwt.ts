import { Elysia, error, t } from 'elysia'

import { User } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'

const bearerTokenGuard = {
  headers: t.Object({
    authorization: t.String({
      pattern: '^Bearer \\S+$'
    })
  })
}

export const jwt = new Elysia()
  .use(jwtSettings)
  .guard(bearerTokenGuard)
  .resolve(({ headers: { authorization } }) => ({ token: authorization.slice('Bearer '.length) }))
  .derive(async ({ token, jwt }) => {
    const decoded = await jwt.verify(token)

    if (!decoded) {
      throw error('Unauthorized', 'Invalid token payload')
    }

    const user = await User.findById(decoded.id)
    if (!user) {
      throw error('Unauthorized', 'User not found')
    }

    return { user }
  })
