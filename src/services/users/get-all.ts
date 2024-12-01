import { User } from '@/models/User'

import { error } from 'elysia'

/* escluir isso depois */
export const getAllUsersService = async () => {
  const user = await User.find().select('-password')

  if (!user) {
    throw error('No Content', { error: 'Usuários não encontrados' })
  }

  return user
}
