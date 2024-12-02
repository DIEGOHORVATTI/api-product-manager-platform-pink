import { error } from 'elysia'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '@/constants/config'
import { IUser } from '@/models/User'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const getSubscriptionService = async (subscriptionId: string, user: IUser) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao buscar assinatura',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}