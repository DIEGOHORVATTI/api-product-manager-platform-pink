import { error } from 'elysia'

import { STRIPE_SECRET_KEY } from '@/constants/config'

import { ITransaction } from '@/models/Transaction'

import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const updateSubscriptionService = async (
  subscriptionId: string,
  data: Pick<ITransaction, 'plan' | 'paymentMethod'>
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (!subscription) {
      throw error('Not Found', { error: 'Assinatura não encontrada' })
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: data.plan === 'Pro' ? 'price_pro_plan_id' : 'price_free_plan_id'
        }
      ],
      payment_settings: {
        payment_method_types: [data.paymentMethod]
      }
    })

    return updatedSubscription
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao atualizar assinatura',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
