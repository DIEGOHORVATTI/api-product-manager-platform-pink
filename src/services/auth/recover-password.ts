import { error } from 'elysia'

import nodemailer from 'nodemailer'
import crypto from 'crypto'

import { User } from '@/models/User'

const DAY = 3_600_000

export const recoverPasswordService = async (email: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  const resetToken = crypto.randomBytes(32).toString('hex')

  const hashedToken = await Bun.password.hash(resetToken)

  user.resetPasswordToken = hashedToken
  user.resetPasswordExpires = new Date(Date.now() + DAY * 0.5) // 30 minutes

  await user.save().catch(err => {
    throw error('Internal Server Error', {
      error: 'Erro ao salvar informações do token',
      details: err.message
    })
  })

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`
  await transporter
    .sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Solicitação de redefinição de senha',
      text: `Você solicitou uma redefinição de senha. Clique no link para redefinir sua senha: ${resetLink}`,
      html: `<p>Você solicitou uma redefinição de senha.</p>
             <p>Clique no link abaixo para redefinir sua senha:</p>
             <a href="${resetLink}">Redefinir senha</a>
             <p>O link é válido por 30 minutos.</p>`
    })
    .catch(err => {
      throw error('Internal Server Error', {
        error: 'Falha ao enviar e-mail',
        details: err.message
      })
    })

  return { success: true, message: 'E-mail enviado com sucesso' }
}
