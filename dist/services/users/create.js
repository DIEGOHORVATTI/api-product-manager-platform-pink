"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUserService", {
    enumerable: true,
    get: function() {
        return createUserService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const createUserService = async (data)=>{
    const existingUser = await _User.User.findOne({
        email: data.email
    });
    if (existingUser) {
        throw (0, _elysia.error)('Conflict', {
            error: 'O usuário com este e-mail já existe'
        });
    }
    const userInstance = new _User.User(data);
    if (userInstance.password) {
        try {
            userInstance.password = await Bun.password.hash(userInstance.password);
        } catch (err) {
            throw (0, _elysia.error)('Internal Server Error', {
                error: 'Falha ao processar a senha'
            });
        }
    }
    await userInstance.save().catch((err)=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Falha ao criar usuário',
            details: err.message
        });
    });
    const { password, ...user } = userInstance.toObject();
    return {
        user
    };
};

//# sourceMappingURL=create.js.map