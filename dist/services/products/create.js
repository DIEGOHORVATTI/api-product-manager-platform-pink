"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createProductService", {
    enumerable: true,
    get: function() {
        return createProductService;
    }
});
const _elysia = require("elysia");
const _Product = require("../../models/Product");
const createProductService = async ({ email, password })=>{
    if (await _Product.Product.findOne({
        email
    })) {
        throw (0, _elysia.error)('Conflict', {
            error: 'User of this email already exists'
        });
    }
    const product = new _Product.Product({
        email,
        password
    });
    await product.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Failed to create user'
        });
    });
    return product;
};

//# sourceMappingURL=create.js.map