import { error } from 'elysia'

import nodemailer from 'nodemailer'

import { User } from '@/models/User'
import { hashPassword } from '@/shared/hashing-password'

export const recoverPasswordService = async (email: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Not Found', { error: 'User not found' })
  }

  const resetToken = Math.random().toString(36).slice(-8)
  const hashedToken = await hashPassword(resetToken)

  user.resetPasswordToken = hashedToken
  user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hour
  await user.save()

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  await transporter
    .sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Password Recovery',
      text: `Your password reset token is: ${resetToken}. This token will expire in 1 hour.`
    })
    .catch(() => {
      throw error('Internal Server Error', { error: 'Failed to send recovery email' })
    })

  return true
}
