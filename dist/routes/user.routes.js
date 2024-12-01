"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _elysia = require("elysia");
const _getone = require("../services/users/get-one");
const _create = require("../services/users/create");
const _update = require("../services/users/update");
const _remove = require("../services/users/remove");
const _User = require("../models/User");
const _jwt = require("../middlewares/jwt");
const router = new _elysia.Elysia({
    prefix: '/users'
}).post('/', async ({ body })=>{
    const user = await (0, _create.createUserService)(body);
    return {
        message: 'User created successfully',
        user
    };
}, _User.UserSchema).get('/', async ()=>{
    return {
        message: 'Users found successfully'
    };
}).use(_jwt.jwt)/* .get('/', async () => {
    const users = await getAllUsersService()

    return { message: 'Users found successfully', users }
  }) */ .get('/:id', async ({ params: { id } })=>{
    const user = await (0, _getone.getOneUserUseCase)(id);
    return {
        message: 'User found successfully',
        user
    };
}).put('/:id', async ({ params: { id }, body })=>{
    const user = await (0, _update.updateUserService)(id, body);
    return {
        message: 'User updated successfully',
        user
    };
}, _User.UserSchema).delete('/:id', async ({ params: { id } })=>{
    await (0, _remove.deleteUserService)(id);
    return {
        message: 'User deleted successfully'
    };
});
const _default = router;

//# sourceMappingURL=user.routes.js.map