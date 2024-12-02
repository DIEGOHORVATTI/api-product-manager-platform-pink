import { Elysia } from 'elysia'

import { handleStripeWebhook } from '@/services/stripe/webhook'

const router = new Elysia().group('/webhooks', app =>
  app.post('/stripe', async ({ request }) => {
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      throw new Error('No signature provided')
    }

    const rawBody = await request.text()
    return handleStripeWebhook(signature, rawBody)
  })
)

export default router
