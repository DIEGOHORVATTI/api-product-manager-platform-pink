import { User, IUser } from '@/models/User'

import { error } from 'elysia'

export const signService = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Unauthorized', 'Email not registered')
  }

  const passwordMatch = user?.comparePassword?.(password)

  if (!passwordMatch) {
    throw error('Unauthorized', 'Invalid credentials')
  }

  return user
}
