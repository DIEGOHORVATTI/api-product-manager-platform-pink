import { User } from '@/models/User'

import { error } from 'elysia'

export const getAllProductsService = async () => {
  const user = await User.find().select('-password')

  if (!user) {
    throw error('No Content', { error: 'User not found' })
  }

  return user
}
