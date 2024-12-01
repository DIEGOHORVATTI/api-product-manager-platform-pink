import { User } from '@/models/User'

import { error } from 'elysia'

export const getOneProductService = async (useId: string) => {
  const user = await User.findById(useId).select('-password')

  if (!user) {
    error('Not Found', { error: 'User not found' })
  }

  return user
}