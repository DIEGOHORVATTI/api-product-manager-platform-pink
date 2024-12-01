"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllProductsService", {
    enumerable: true,
    get: function() {
        return getAllProductsService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const getAllProductsService = async ()=>{
    const user = await _User.User.find().select('-password');
    if (!user) {
        throw (0, _elysia.error)('No Content', {
            error: 'User not found'
        });
    }
    return user;
};

//# sourceMappingURL=get-all.js.map