import { error } from 'elysia'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '@/constants/config'
import { IUser } from '@/models/User'

const stripe = new Stripe(STRIPE_SECRET_KEY)

interface UpdateData {
  plan: 'Free' | 'Pro'
  paymentMethod: 'pix' | 'credit_card'
}

export const updateSubscriptionService = async (subscriptionId: string, data: UpdateData, user: IUser) => {
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
        payment_method_types: [data.paymentMethod === 'credit_card' ? 'card' : 'pix']
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