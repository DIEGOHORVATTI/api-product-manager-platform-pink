import { error } from 'elysia'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '@/constants/config'
import { IUser } from '@/models/User'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const cancelSubscriptionService = async (subscriptionId: string, user: IUser) => {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao cancelar assinatura',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}