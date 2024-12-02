import { Elysia } from 'elysia'
import { jwt } from '@/middlewares/jwt'

import { getAllTransactionsService, getTransactionService, createRefundService } from '@/services/stripe/transaction'

const router = new Elysia().group('/transactions', app =>
  app
    .use(jwt)
    .get('/', async ({ user }) => {
      const transactions = await getAllTransactionsService(user)

      return { message: 'Transações encontradas com sucesso', transactions }
    })
    .get('/:id', async ({ params: { id }, user }) => {
      const transaction = await getTransactionService(id, user)

      return { message: 'Transação encontrada com sucesso', transaction }
    })
    .post('/refund/:id', async ({ params: { id }, user }) => {
      const refund = await createRefundService(id, user)

      return { message: 'Reembolso solicitado com sucesso', refund }
    })
)

export default router
