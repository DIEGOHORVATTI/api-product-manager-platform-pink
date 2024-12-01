"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "signService", {
    enumerable: true,
    get: function() {
        return signService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const signService = async ({ email, password })=>{
    const user = await _User.User.findOne({
        email
    });
    if (!user) {
        throw (0, _elysia.error)('Unauthorized', {
            error: 'Email not registered'
        });
    }
    const passwordMatch = user.comparePassword?.(password);
    if (!passwordMatch) {
        throw (0, _elysia.error)('Unauthorized', {
            error: 'Invalid credentials'
        });
    }
    return user;
};

//# sourceMappingURL=sign.js.map