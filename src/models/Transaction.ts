import { t as Type } from 'elysia'
import { Schema, Types } from 'mongoose'

import { collectionsData } from '@/constants/config'
import { setDefaultSettingsSchema } from '@/shared/set-default-settings-schema'
import { connectDB } from '@/shared/connection-db'

export const TransactionSchema = {
  body: Type.Object({
    userId: Type.String().objectId(),
    plan: Type.Enum({ Free: 'Free', Pro: 'Pro' }),
    paymentMethod: Type.Enum({ pix: 'pix', credit_card: 'credit_card' }),
    status: Type.Enum({ pending: 'pending', completed: 'completed', failed: 'failed' }),
    amount: Type.Number(),
    stripePaymentIntent: Type.Optional(
      Type.Object({
        id: Type.String(),
        clientSecret: Type.String()
      })
    )
  })
}

export type ITransaction = typeof TransactionSchema.body.static & {
  paymentDate: Date
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
      enum: ['Free', 'Pro'],
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['pix', 'credit_card'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    stripePaymentIntent: {
      id: String,
      clientSecret: String
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
