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
const _sign = require("../services/auth/sign");
const _register = require("../services/auth/register");
const _recoverpassword = require("../services/auth/recover-password");
const _jwtsettings = require("../shared/jwt-settings");
const router = new _elysia.Elysia().group('/auth', (server)=>server.use(_jwtsettings.jwtSettings).post('/login', async ({ body, jwt })=>{
        const user = await (0, _sign.signService)(body);
        const token = await jwt.sign({
            id: user.id
        });
        return {
            token
        };
    }, _User.UserSchema).post('/register', async ({ body })=>{
        const user = await (0, _register.registerService)(body);
        return {
            message: 'User registered successfully',
            user
        };
    }, _User.UserSchema).post('/recover-password', async ({ body: { email } })=>{
        await (0, _recoverpassword.recoverPasswordService)(email);
        return {
            message: 'Recovery email sent successfully'
        };
    }, {
        body: _elysia.t.Object({
            email: _elysia.t.String({
                format: 'email'
            })
        })
    }));
const _default = router;

//# sourceMappingURL=auth.routes.js.map