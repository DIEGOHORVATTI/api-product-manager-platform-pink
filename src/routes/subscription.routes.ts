import { Elysia } from 'elysia'
import { jwt } from '@/middlewares/jwt'
import { 
  createSubscriptionService,
  cancelSubscriptionService,
  getSubscriptionService
} from '@/services/subscriptions'

const router = new Elysia().group('/subscriptions', server =>
  server
    .use(jwt)
    .post(
      '/',
      async ({ body, user }) => {
        const subscription = await createSubscriptionService(body, user)
        return { message: 'Subscription created successfully', subscription }
      },
      {
        body: Elysia.t.Object({
          plan: Elysia.t.Enum({ Free: 'Free', Pro: 'Pro' }),
          paymentMethod: Elysia.t.Enum({ pix: 'pix', credit_card: 'credit_card' })
        })
      }
    )
    .delete('/', async ({ user }) => {
      await cancelSubscriptionService(user)
      return { message: 'Subscription cancelled successfully' }
    })
    .get('/', async ({ user }) => {
      const subscription = await getSubscriptionService(user)
      return { message: 'Subscription retrieved successfully', subscription }
    })
)

export default router