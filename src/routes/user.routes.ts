import { Elysia } from 'elysia'

import {
  getAllUsersService,
  getOneUserUseCase,
  createUserService,
  updateUserService,
  deleteUserService
} from '@/services/users'

import { UserSchema } from '@/models/User'
import { jwt } from '@/middlewares/jwt'

const router = new Elysia().group('/users', server =>
  server
    .post(
      '/',
      async ({ body }) => {
        const { user } = await createUserService(body)

        return { message: 'Usuário criado com sucesso', user }
      },
      UserSchema
    )
    .use(jwt)
    /* ---------REMOVER--------- */
    .get('/', async () => {
      const { users } = await getAllUsersService()

      return { message: 'Usuários encontrados com sucesso', users }
    })
    /* ------------------------- */
    .get('/:id', async ({ params: { id } }) => {
      const { user } = await getOneUserUseCase(id)

      return { message: 'Usuário encontrado com sucesso', user }
    })
    .put(
      '/:id',
      async ({ params: { id }, body }) => {
        const { user } = await updateUserService(id, body)

        return { message: 'Usuário atualizado com sucesso', user }
      },
      UserSchema
    )
    .delete('/:id', async ({ params: { id } }) => {
      await deleteUserService(id)

      return { message: 'Usuário deletado com sucesso' }
    })
)

export default router
