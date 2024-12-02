import { error } from 'elysia'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '@/constants/config'
import { IUser } from '@/models/User'

const stripe = new Stripe(STRIPE_SECRET_KEY)

interface CheckoutData {
  plan: 'Free' | 'Pro'
  paymentMethod: 'pix' | 'credit_card'
}

export const createCheckoutSessionService = async (data: CheckoutData, user: IUser) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: [data.paymentMethod === 'credit_card' ? 'card' : 'pix'],
      line_items: [
        {
          price: data.plan === 'Pro' ? 'price_pro_plan_id' : 'price_free_plan_id',
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    })

    return session
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao criar sessão de checkout',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}