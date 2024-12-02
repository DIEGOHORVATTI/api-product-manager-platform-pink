import { error } from 'elysia'
import { Transaction } from '@/models/Transaction'
import { IUser } from '@/models/User'

export const getTransactionService = async (transactionId: string, user: IUser) => {
  try {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId: user.id
    })

    if (!transaction) {
      throw error('Not Found', { error: 'Transação não encontrada' })
    }

    return transaction
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao buscar transação',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}