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

      return { message: 'Produtos encontrados com sucesso', products }
    })
    .get('/:id', async ({ params: { id } }) => {
      const product = await getOneProductService(id)
      return { message: 'Product found successfully', product }
    })
    .post(
      '/',
      async ({ body, user }) => {
        const product = await createProductService(body, user)
        return { message: 'Produto criado com sucesso', product }
      },
      ProductSchema
    )
    .put(
      '/:id',
      async ({ params: { id }, body, user }) => {
        const product = await updateProductService(id, body, user)
        return { message: 'Produto atualizado com sucesso', product }
      },
      ProductSchema
    )
    .delete('/:id', async ({ params: { id } }) => {
      await deleteProductService(id)

      return { message: 'Produto deletado com sucesso' }
    })
)

export default router
