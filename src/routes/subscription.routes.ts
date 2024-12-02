import { Elysia, t as Type } from 'elysia'
import { jwt } from '@/middlewares/jwt'

import {
  createSubscriptionService,
  updateSubscriptionService,
  cancelSubscriptionService,
  getSubscriptionService
} from '@/services/stripe/subscription'
import { subscriptionSchema } from '../models/Transaction'

const router = new Elysia().group('/subscribe', app =>
  app
    .use(jwt)
    .post(
      '/',
      async ({ body, user }) => {
        const subscription = await createSubscriptionService(body, user)

        return { message: 'Assinatura criada com sucesso', subscription }
      },
      { body: Type.Object(subscriptionSchema) }
    )
    .put(
      '/:id',
      async ({ params: { id }, body }) => {
        const subscription = await updateSubscriptionService(id, body)

        return { message: 'Assinatura atualizada com sucesso', subscription }
      },
      { body: Type.Object(subscriptionSchema) }
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
