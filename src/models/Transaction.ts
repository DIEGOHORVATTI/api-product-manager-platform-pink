import { t as Type } from 'elysia'
import { Document, Schema, Types } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema, connectDB } from '@/shared'

import Stripe from 'stripe'

const paymentMethod: Stripe.SubscriptionCreateParams.PaymentSettings['payment_method_types'] = [
  'boleto',
  'card',
  'link',
  'paypal'
] as const
const planOptions = ['Free', 'Pro'] as const
const paymentStatusList = ['pending', 'completed', 'failed'] as const

export const subscriptionSchema = {
  plan: Type.Union(planOptions.map(plan => Type.Literal(plan))),
  paymentMethod: Type.Union(paymentMethod.map(method => Type.Literal(method)))
}

export const TransactionSchema = {
  body: Type.Object({
    ...subscriptionSchema,
    userId: Type.String(),
    status: Type.Union(paymentStatusList.map(status => Type.Literal(status))),
    amount: Type.Number(),
    stripePaymentIntent: Type.Object({
      id: Type.String(),
      clientSecret: Type.String()
    })
  })
}

type TransactionModel = typeof TransactionSchema.body.static
export type ITransaction = Omit<TransactionModel, 'userId'> &
  Document & {
    paymentDate: Date
    userId: Schema.Types.ObjectId
  }

const SchemaModel = new Schema<ITransaction>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: collectionsData.User.name
    },
    plan: {
      type: String,
      enum: planOptions,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: paymentMethod,
      required: true
    },
    status: {
      type: String,
      enum: paymentStatusList,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    stripePaymentIntent: {
      type: {
        id: String,
        clientSecret: String
      },
      required: true
    },
    paymentDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: collectionsData.Transaction.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

export const Transaction = connectDB.model<ITransaction>(collectionsData.Transaction.name, SchemaModel)
