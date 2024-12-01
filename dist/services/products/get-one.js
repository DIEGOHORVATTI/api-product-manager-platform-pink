"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOneProductService", {
    enumerable: true,
    get: function() {
        return getOneProductService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const getOneProductService = async (useId)=>{
    const user = await _User.User.findById(useId).select('-password');
    if (!user) {
        (0, _elysia.error)('Not Found', {
            error: 'User not found'
        });
    }
    return user;
};

//# sourceMappingURL=get-one.js.map