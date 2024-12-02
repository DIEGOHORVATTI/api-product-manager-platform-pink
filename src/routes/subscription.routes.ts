import { Elysia, t } from 'elysia'
import { jwt } from '@/middlewares/jwt'

import {
  createSubscriptionService,
  updateSubscriptionService,
  cancelSubscriptionService,
  getSubscriptionService
} from '@/services/stripe/subscription'

const subscriptionSchema = {
  body: t.Object({
    plan: t.Enum({ Free: 'Free', Pro: 'Pro' }),
    paymentMethod: t.Enum({ pix: 'pix', credit_card: 'credit_card' })
  })
}

const router = new Elysia().group('/subscribe', app =>
  app
    .use(jwt)
    .post(
      '/',
      async ({ body, user }) => {
        const subscription = await createSubscriptionService(body, user)

        return { message: 'Assinatura criada com sucesso', subscription }
      },
      { body: subscriptionSchema.body }
    )
    .put(
      '/:id',
      async ({ params: { id }, body, user }) => {
        const subscription = await updateSubscriptionService(id, body, user)

        return { message: 'Assinatura atualizada com sucesso', subscription }
      },
      { body: subscriptionSchema.body }
    )
    .delete('/:id', async ({ params: { id }, user }) => {
      await cancelSubscriptionService(id, user)

      return { message: 'Assinatura cancelada com sucesso' }
    })
    .get('/:id', async ({ params: { id }, user }) => {
      const subscription = await getSubscriptionService(id, user)

      return { message: 'Assinatura encontrada com sucesso', subscription }
    })
)

export default router
