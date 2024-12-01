import { t as Type } from 'elysia'
import { Schema } from 'mongoose'
import { collectionsData } from '@/constants/config'
import { setDefaultSettingsSchema } from '@/shared/set-default-settings-schema'
import { connectDB } from '@/shared/connection-db'

export const CompanySchema = {
  body: Type.Object({
    name: Type.String(),
    cnpj: Type.String(),
    about: Type.Optional(Type.String())
  })
}

export type ICompany = typeof CompanySchema.body.static

const CompanySchemaModel = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true
    },
    cnpj: {
      type: String,
      required: true,
      unique: true
    },
    about: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: collectionsData.Company.collection
  }
)

setDefaultSettingsSchema(CompanySchemaModel)

export const Company = connectDB.model<ICompany>(collectionsData.Company.name, CompanySchemaModel)
