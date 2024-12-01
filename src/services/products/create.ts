import { IUser, User } from '@/models/User'

import { error } from 'elysia'
import { Product } from '../../models/Product'

export const createProductService = async ({ email, password }: IUser) => {
  if (await Product.findOne({ email })) {
    throw error('Conflict', { error: 'Esse e-mail já está cadastrado' })
  }

  const product = new Product({ email, password })

  await product.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao criar produto' })
  })

  return product
}
