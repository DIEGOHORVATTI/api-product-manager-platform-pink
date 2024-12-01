"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOneUserUseCase", {
    enumerable: true,
    get: function() {
        return getOneUserUseCase;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const getOneUserUseCase = async (useId)=>{
    const user = await _User.User.findById(useId);
    if (!user) {
        (0, _elysia.error)(404, 'User not found');
    }
    return user;
};

//# sourceMappingURL=get-one.js.map