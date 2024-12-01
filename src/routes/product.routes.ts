import { Elysia } from 'elysia'

import { ProductSchema } from '@/models/Product'
import { jwt } from '@/middlewares/jwt'

import {
  getAllProductsService,
  getOneProductService,
  createProductService,
  updateProductService,
  deleteProductService
} from '@/services/products'

const router = new Elysia().group('/products', server =>
  server
    .use(jwt)
    .get('/', async () => {
      const products = await getAllProductsService()
      return { message: 'Products found successfully', products }
    })
    .get('/:id', async ({ params: { id } }) => {
      const product = await getOneProductService(id)
      return { message: 'Product found successfully', product }
    })
    /* .post(
      '/',
      async ({ body, user }) => {
        const product = await createProductService(body, user)
        return { message: 'Product created successfully', product }
      },
      ProductSchema
    )
    .put(
      '/:id',
      async ({ params: { id }, body, user }) => {
        const product = await updateProductService(id, body, user)
        return { message: 'Product updated successfully', product }
      },
      ProductSchema
    ) */
    .delete('/:id', async ({ params: { id } }) => {
      await deleteProductService(id)

      return { message: 'Product deleted successfully' }
    })
)

export default router
