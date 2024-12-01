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
const createUserService = async ({ email, password })=>{
    if (await _User.User.findOne({
        email
    })) {
        throw (0, _elysia.error)('Conflict', {
            error: 'User of this email already exists'
        });
    }
    const user = new _User.User({
        email,
        password
    });
    await user.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Failed to create user'
        });
    });
    return user;
};

//# sourceMappingURL=create.js.map