import { Elysia } from 'elysia'

import { createUserService } from './create-user'
import { getOneUserService } from './get-one-user'
import { updateUserService } from './update-user'
import { deleteUserService } from './remove-user'

import { jwt } from '@/middlewares/jwt'
import { UserSchema } from '@/models/User'
import { getUsersService } from './get-users'

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
    const users = await getUsersService()

    return { message: 'Users found successfully', users }
  })
  .get('/:id', async ({ params: { id } }) => {
    const user = await getOneUserService(id)

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
