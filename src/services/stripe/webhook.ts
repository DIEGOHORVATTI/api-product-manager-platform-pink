import { error } from 'elysia'
import Stripe from 'stripe'

import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '@/constants/config'

import { Transaction } from '@/models/Transaction'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const handleStripeWebhook = async (signature: string, rawBody: string) => {
  try {
    const event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handleSuccessfulPayment(paymentIntent)
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handleFailedPayment(paymentIntent)
        break
      }
    }

    return { received: true }
  } catch (err) {
    throw error('Bad Request', {
      error: 'Webhook error',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const transaction = await Transaction.findOne({
    'stripePaymentIntent.id': paymentIntent.id
  })

  if (!transaction) {
    throw error('Not Found', { error: 'Transaction not found' })
  }

  transaction.status = 'completed'
  transaction.paymentDate = new Date()

  await transaction.save()
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const transaction = await Transaction.findOne({
    'stripePaymentIntent.id': paymentIntent.id
  })

  if (!transaction) {
    throw error('Not Found', { error: 'Transaction not found' })
  }

  transaction.status = 'failed'
  await transaction.save()
}
