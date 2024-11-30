import { User } from '@/models/User'

import { error } from 'elysia'

export const getAllUsersService = async () => {
  const user = await User.find().select('-password')

  if (!user) {
    throw error('No Content', 'User not found')
  }

  return user
}
