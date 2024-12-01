import { error } from 'elysia'

import { User, IUser } from '@/models/User'

export const signService = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Unauthorized', { error: 'E-mail não cadastrado' })
  }

  const isValidPassword = user.comparePassword?.(password)

  if (!isValidPassword) {
    throw error('Unauthorized', { error: 'Senha inválida' })
  }

  return user
}
