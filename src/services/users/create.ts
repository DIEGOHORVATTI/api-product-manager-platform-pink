import { IUser, User } from '@/models/User'

import { error } from 'elysia'

export const createUserService = async (data: IUser) => {
  if (await User.findOne({ email: data.email })) {
    throw error('Conflict', { error: 'O usuário deste e-mail já existe' })
  }

  const newUser = new User(data)

  await newUser.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao criar usuário' })
  })

  const { password, ...user } = newUser.toObject()

  return { user }
}
