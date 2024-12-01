import { IUser, User } from '@/models/User'

import { error } from 'elysia'

export const updateUserService = async (id: string, { email, password }: IUser) => {
  const user = await User.findById(id)

  if (!user) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    const isDifferentUser = existingUser?.id !== id

    if (isDifferentUser) {
      throw error('Conflict', { error: 'Esse e-mail já está em uso' })
    }

    user.email = email
  }

  if (password) {
    user.password = password
  }

  await user?.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao atualizar usuário' })
  })

  return user
}
