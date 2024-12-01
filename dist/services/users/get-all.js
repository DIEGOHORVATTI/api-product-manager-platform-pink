"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllUsersService", {
    enumerable: true,
    get: function() {
        return getAllUsersService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const getAllUsersService = async ()=>{
    const users = await _User.User.find().select('-password');
    if (!users) {
        throw (0, _elysia.error)('No Content', {
            error: 'Usuários não encontrados'
        });
    }
    return {
        users
    };
};

//# sourceMappingURL=get-all.js.map