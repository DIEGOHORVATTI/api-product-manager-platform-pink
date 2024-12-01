"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateUserService", {
    enumerable: true,
    get: function() {
        return updateUserService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const updateUserService = async (id, { email, password })=>{
    const user = await _User.User.findById(id);
    if (!user) {
        throw (0, _elysia.error)('Not Found', {
            error: 'Usuário não encontrado'
        });
    }
    if (email) {
        const existingUser = await _User.User.findOne({
            email
        });
        const isDifferentUser = existingUser?.id !== id;
        if (isDifferentUser) {
            throw (0, _elysia.error)('Conflict', {
                error: 'Esse e-mail já está em uso'
            });
        }
        user.email = email;
    }
    if (password) {
        user.password = password;
    }
    await user?.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Falha ao atualizar usuário'
        });
    });
    return user;
};

//# sourceMappingURL=update.js.map