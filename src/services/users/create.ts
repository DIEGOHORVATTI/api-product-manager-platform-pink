import { IUser, User } from '@/models/User'
import { error } from 'elysia'

export const createUserService = async (data: IUser) => {
  const existingUser = await User.findOne({ email: data.email })

  if (existingUser) {
    throw error('Conflict', { error: 'O usuário com este e-mail já existe' })
  }

  const userInstance = new User(data)

  if (userInstance.password) {
    try {
      userInstance.password = await Bun.password.hash(userInstance.password)
    } catch (err) {
      throw error('Internal Server Error', { error: 'Falha ao processar a senha' })
    }
  }

  await userInstance.save().catch(err => {
    throw error('Internal Server Error', {
      error: 'Falha ao criar usuário',
      details: err.message
    })
  })

  const { password, ...user } = userInstance.toObject()

  return { user }
}
