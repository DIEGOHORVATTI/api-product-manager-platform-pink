import { t as Type } from 'elysia'

import { Schema } from 'mongoose'
import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema } from '@/shared/set-default-settings-schema'
import { connectDB } from '@/shared/connection-db'

export const UserSchema = {
  body: Type.Object({
    name: Type.String(),
    surname: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
    photo: Type.Optional(Type.String()),
    company: Type.Object({
      name: Type.String(),
      cnpj: Type.String(),
      about: Type.Optional(Type.String())
    }),
    plan: Type.Enum({ Free: 'Free', Pro: 'Pro' })
  })
}

export type IUser = typeof UserSchema.body.static & {
  permissions?: string[]
  comparePassword?: (password: string) => Promise<boolean>
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}

const SchemaModel = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    permissions: {
      type: [String],
      default: ['user']
    },
    photo: String,
    company: {
      name: {
        type: String,
        required: true
      },
      cnpj: {
        type: String,
        required: true
      },
      about: String
    },
    plan: {
      type: String,
      enum: ['Free', 'Pro'],
      default: 'Free'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

SchemaModel.methods.comparePassword = function (this: IUser, password: string) {
  return Bun.password.verify(password, this.password)
}

export const User = connectDB.model<IUser>(collectionsData.User.name, SchemaModel)
