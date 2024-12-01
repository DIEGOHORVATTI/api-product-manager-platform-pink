import { IUser, User } from '@/models/User'

import { error } from 'elysia'
import { Product } from '../../models/Product'

export const createUserService = async ({ email, password }: IUser) => {
  if (await Product.findOne({ email })) {
    throw error('Conflict', { error: 'User of this email already exists' })
  }

  const product = new Product({ email, password })

  await product.save().catch(() => {
    throw error('Internal Server Error', { error: 'Failed to create user' })
  })

  return product
}
