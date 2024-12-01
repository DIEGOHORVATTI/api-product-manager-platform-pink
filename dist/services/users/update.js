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
    const newUser = await _User.User.findById(id);
    if (!newUser) {
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
        newUser.email = email;
    }
    if (password) {
        newUser.password = password;
    }
    await newUser?.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Falha ao atualizar usuário'
        });
    });
    const { password: _password, ...user } = newUser.toObject();
    return {
        user
    };
};

//# sourceMappingURL=update.js.map