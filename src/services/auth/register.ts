import { IUser, User } from '@/models/User'
import { error } from 'elysia'

import { hashPassword } from '@/shared/hashing-password'

export const registerService = async (userData: IUser) => {
  if (await User.findOne({ email: userData.email })) {
    throw error('Conflict', { error: 'User with this email already exists' })
  }

  const hashedPassword = await hashPassword(userData.password)
  const newUser = new User({
    ...userData,
    password: hashedPassword
  })

  await newUser.save().catch(() => {
    throw error('Internal Server Error', { error: 'Failed to create user' })
  })

  const { password, ...user } = newUser.toObject()

  return { user }
}
