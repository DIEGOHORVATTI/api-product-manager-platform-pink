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
    if (await _User.User.findOne({
        email: data.email
    })) {
        throw (0, _elysia.error)('Conflict', {
            error: 'O usuário deste e-mail já existe'
        });
    }
    const newUser = new _User.User(data);
    await newUser.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Falha ao criar usuário'
        });
    });
    const { password, ...user } = newUser.toObject();
    return {
        user
    };
};

//# sourceMappingURL=create.js.map