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
    const user = await _User.User.find();
    if (!user) {
        throw (0, _elysia.error)('No Content', 'User not found');
    }
    return user;
};

//# sourceMappingURL=get-all.js.map