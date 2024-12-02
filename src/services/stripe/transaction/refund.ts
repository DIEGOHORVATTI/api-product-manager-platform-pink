import { error } from 'elysia'

import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '@/constants/config'

import { Transaction } from '@/models/Transaction'
import { IUser } from '@/models/User'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const createRefundService = async (transactionId: string, user: IUser) => {
  try {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId: user.id
    })

    if (!transaction) {
      throw error('Not Found', { error: 'Transação não encontrada' })
    }

    const refund = await stripe.refunds.create({
      payment_intent: transaction.stripePaymentIntent?.id
    })

    transaction.status = 'refunded'
    await transaction.save()

    return refund
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao criar reembolso',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
