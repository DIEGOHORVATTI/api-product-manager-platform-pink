import { Elysia, t } from 'elysia'
import { jwt } from '@/middlewares/jwt'

import { createCheckoutSessionService } from '@/services/stripe/checkout'

const checkoutSchema = {
  body: t.Object({
    plan: t.Enum({ Free: 'Free', Pro: 'Pro' }),
    paymentMethod: t.Enum({ pix: 'pix', credit_card: 'credit_card' })
  })
}

const router = new Elysia().group('/checkout', app =>
  app.use(jwt).post(
    '/session',
    async ({ body, user }) => {
      const session = await createCheckoutSessionService(body, user)
      return { message: 'Sessão de checkout criada com sucesso', session }
    },
    { body: checkoutSchema.body }
  )
)

export default router
