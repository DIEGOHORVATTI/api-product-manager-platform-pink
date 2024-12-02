import { error } from 'elysia'
import { Transaction } from '@/models/Transaction'
import { IUser } from '@/models/User'

export const getAllTransactionsService = async (user: IUser) => {
  try {
    const transactions = await Transaction.find({ userId: user.id })
    return transactions
  } catch (err) {
    throw error('Internal Server Error', {
      error: 'Falha ao buscar transações',
      details: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}