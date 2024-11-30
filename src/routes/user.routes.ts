import { Elysia } from 'elysia'

import { createUserService } from '@/services/users/create'
import { getOneUserUseCase } from '@/services/users/get-one'
import { updateUserService } from '@/services/users/update'
import { deleteUserService } from '@/services/users/remove'

import { jwt } from '@/middlewares/jwt'
import { UserSchema } from '@/models/User'
import { getAllUsersService } from '@/services/users/get-all'

export const userRouter = new Elysia({ prefix: '/users' })
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
