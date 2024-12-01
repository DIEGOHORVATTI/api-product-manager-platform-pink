import { t as Type } from 'elysia'

import { Schema } from 'mongoose'
import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema } from '@/shared/set-default-settings-schema'
import { connectDB } from '@/shared/connection-db'

export const UserSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6, maxLength: 20, pattern: '^[a-zA-Z0-9]*$' })
  })
}

type IUserModel = typeof UserSchema.body.static
export type IUser = IUserModel & {
  token?: string
  comparePassword?: (password: string) => boolean
}

const SchemaModel = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

SchemaModel.methods.comparePassword = function (this: IUser, password: string) {
  return this.password === password
}

export const User = connectDB.model<IUser>(collectionsData.User.name, SchemaModel)
