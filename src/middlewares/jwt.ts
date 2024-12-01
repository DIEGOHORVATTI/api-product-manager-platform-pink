import { Elysia, error, t } from 'elysia'

import { User } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'

const bearerTokenGuard = {
  headers: t.Object({
    authorization: t.String({ pattern: '^Bearer \\S+$' })
  })
}

export const jwt = new Elysia()
  .use(jwtSettings)
  .guard(bearerTokenGuard)
  .derive(async ({ headers: { authorization }, jwt }) => {
    if (!authorization) {
      throw error('Unauthorized', { error: 'No token provided' })
    }

    const token = authorization.slice('Bearer '.length)
    const decoded = await jwt.verify(token)

    if (!decoded) {
      throw error('Unauthorized', { error: 'Invalid token payload' })
    }

    const user = await User.findById(decoded.id)
    if (!user) {
      throw error('Unauthorized', { error: 'User not found' })
    }

    return { user }
  })
