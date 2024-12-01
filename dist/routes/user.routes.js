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
const _users = require("../services/users");
const _User = require("../models/User");
const _jwt = require("../middlewares/jwt");
const router = new _elysia.Elysia().group('/users', (server)=>server.post('/', async ({ body })=>{
        const { user } = await (0, _users.createUserService)(body);
        return {
            message: 'Usuário criado com sucesso',
            user
        };
    }, _User.UserSchema).use(_jwt.jwt).get('/', async ()=>{
        const { users } = await (0, _users.getAllUsersService)();
        return {
            message: 'Usuários encontrados com sucesso',
            users
        };
    }).get('/:id', async ({ params: { id } })=>{
        const { user } = await (0, _users.getOneUserUseCase)(id);
        return {
            message: 'Usuário encontrado com sucesso',
            user
        };
    }).put('/:id', async ({ params: { id }, body })=>{
        const { user } = await (0, _users.updateUserService)(id, body);
        return {
            message: 'Usuário atualizado com sucesso',
            user
        };
    }, _User.UserSchema).delete('/:id', async ({ params: { id } })=>{
        await (0, _users.deleteUserService)(id);
        return {
            message: 'Usuário deletado com sucesso'
        };
    }));
const _default = router;

//# sourceMappingURL=user.routes.js.map