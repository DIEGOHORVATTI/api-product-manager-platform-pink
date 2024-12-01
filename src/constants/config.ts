export const collectionsData = {
  User: {
    name: 'User',
    collection: 'users'
  },
  Product: {
    name: 'Product',
    collection: 'products'
  },
  Transaction: {
    name: 'Transaction',
    collection: 'transactions'
  },
  Company: {
    name: 'Company',
    collection: 'companies'
  }
}

export const HOST_API = process.env.HOST_API || ''

export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || ''

export const MONGO_URL = process.env.MONGO_URI || ''

export const PORT = process.env.PORT || 3000

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const JWT_EXP = process.env.JWT_EXP || '7d'

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export const NODE_ENV = process.env.NODE_ENV
