import { error } from 'elysia'
import Stripe from 'stripe'

import { STRIPE_SECRET_KEY } from '@/constants/config'

import { IUser } from '@/models/User'
import { ITransaction, Transaction } from '@/models/Transaction'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const createSubscriptionService = async (data: Pick<ITransaction, 'plan' | 'paymentMethod'>, user: IUser) => {
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id
      }
    })

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: data.plan === 'Pro' ? 'price_pro_plan_id' : 'price_free_plan_id'
        }
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: [data.paymentMethod]
      },
      expand: ['latest_invoice.payment_intent']
    })

    const transaction = new Transaction({
      userId: user.id,
      plan: data.plan,
      paymentMethod: data.paymentMethod,
      status: 'pending',
      amount: data.plan === 'Pro' ? 29.9 : 0,
      stripePaymentIntent: {
        id: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret
      }
    })

    await transaction.save()

    return { subscription, transaction }
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao criar assinatura',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
