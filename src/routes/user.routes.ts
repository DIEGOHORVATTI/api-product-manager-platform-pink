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
        const user = await createUserService(body)

        return { message: 'User created successfully', user }
      },
      UserSchema
    )
    .use(jwt)
    .get('/', async () => {
      const users = await getAllUsersService()

      return { message: 'Users found successfully', users }
    })
    .get('/:id', async ({ params: { id } }) => {
      const user = await getOneUserUseCase(id)

      return { message: 'User found successfully', user }
    })
    .put(
      '/:id',
      async ({ params: { id }, body }) => {
        const user = await updateUserService(id, body)

        return { message: 'User updated successfully', user }
      },
      UserSchema
    )
    .delete('/:id', async ({ params: { id } }) => {
      await deleteUserService(id)

      return { message: 'User deleted successfully' }
    })
)

export default router
