"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _elysia = /*#__PURE__*/ _interop_require_default(require("elysia"));
const _User = require("../models/User");
const _jwtsettings = require("../shared/jwt-settings");
const _sign = require("../services/auth/sign");
const _ = require("..");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = new _elysia.default().use(_.server).use(_jwtsettings.jwtSettings).group('/auth', (users)=>{
    return users.post('/login', async ({ body, jwt })=>{
        const user = await (0, _sign.signService)(body);
        const token = await jwt.sign({
            id: user?.id
        });
        return {
            token
        };
    }, _User.UserSchema);
});

//# sourceMappingURL=auth.routes.js.map