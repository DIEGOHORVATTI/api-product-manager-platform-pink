import { User, IUser } from '@/models/User'

import { error } from 'elysia'

export const signService = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Unauthorized', { error: 'Email not registered' })
  }

  const passwordMatch = user.comparePassword?.(password)

  if (!passwordMatch) {
    throw error('Unauthorized', { error: 'Invalid credentials' })
  }

  return user
}
