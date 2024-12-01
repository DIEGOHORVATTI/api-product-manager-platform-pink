import { IUser, User } from '@/models/User'

import { error } from 'elysia'

export const createUserService = async ({ email, password }: IUser) => {
  if (await User.findOne({ email })) {
    throw error('Conflict', { error: 'User of this email already exists' })
  }

  const user = new User({ email, password })

  await user.save().catch(() => {
    throw error('Internal Server Error', { error: 'Failed to create user' })
  })

  return user
}
