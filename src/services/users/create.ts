import { IUser, User } from '@/models/User'

import { error } from 'elysia'

export const createUserService = async (data: IUser) => {
  if (await User.findOne({ email: data.email })) {
    throw error('Conflict', { error: 'O usuário deste e-mail já existe' })
  }

  const user = new User(data)

  await user.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao criar usuário' })
  })

  return user
}
