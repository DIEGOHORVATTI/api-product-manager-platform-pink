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
        (0, _elysia.error)(401, 'Email not registered');
    }
    const passwordMatch = user?.comparePassword?.(password);
    if (!passwordMatch) {
        (0, _elysia.error)(401, 'Invalid credentials');
    }
    return user;
};

//# sourceMappingURL=sign.js.map