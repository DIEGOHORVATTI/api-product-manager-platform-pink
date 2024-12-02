import { error } from 'elysia'

import { IProduct, Product } from '@/models/Product'

export const createProductService = async (data: IProduct) => {
  const existingUser = await User.findOne({ email: data.email })

  if (existingUser) {
    throw error('Conflict', { error: 'O usuário com este e-mail já existe' })
  }

  const userInstance = new User(data)
  userInstance.password = await userInstance.hashPassword()

  await userInstance.save().catch(err => {
    throw error('Internal Server Error', {
      error: 'Falha ao criar usuário',
      details: err.message
    })
  })

  const { password, ...user } = userInstance.toObject()

  return { user }
}
