import { User } from '@/models/User'

import { error } from 'elysia'

/* escluir isso depois */
export const getAllUsersService = async () => {
  const users = await User.find().select('-password')

  if (!users) {
    throw error('No Content', { error: 'Usuários não encontrados' })
  }

  return { users }
}
