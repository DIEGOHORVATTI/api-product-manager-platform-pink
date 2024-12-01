import { t as Type } from 'elysia'
import { Schema, Types } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema } from '@/shared/set-default-settings-schema'
import { connectDB } from '@/shared/connection-db'

export const ProductSchema = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    price: Type.Number(),
    company: Type.Object({
      id: Type.String(),
      name: Type.String()
    })
  })
}

export type IProduct = typeof ProductSchema.body.static & {
  qrCodeUrl: string
  views: number
  clicks: number
}

const SchemaModel = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    company: {
      id: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
      },
      name: {
        type: String,
        required: true
      }
    },
    qrCodeUrl: String,
    views: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    collection: collectionsData.Product.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

export const Product = connectDB.model<IProduct>(collectionsData.Product.name, SchemaModel)