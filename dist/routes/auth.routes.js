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
const _User = require("../models/User");
const _jwtsettings = require("../shared/jwt-settings");
const _sign = require("../services/auth/sign");
const authRouter = new _elysia.Elysia({
    prefix: '/auth'
}).use(_jwtsettings.jwtSettings).post('/login', async ({ body, jwt })=>{
    const user = await (0, _sign.signService)(body);
    const token = await jwt.sign({
        id: user?.id
    });
    return {
        token
    };
}, _User.UserSchema);
const _default = authRouter;

//# sourceMappingURL=auth.routes.js.map