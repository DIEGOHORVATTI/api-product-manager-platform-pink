"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateProductService", {
    enumerable: true,
    get: function() {
        return updateProductService;
    }
});
const _Product = require("../../models/Product");
const _elysia = require("elysia");
const updateProductService = async (id, body, user)=>{
    const product = await _Product.Product.findById(id);
    if (!product) {
        throw (0, _elysia.error)(404, 'Product not found');
    }
    /* if (product.user.toString() !== user._id.toString()) {
    throw error(403, 'You are not allowed to update this product')
  } */ Object.assign(product, body);
    await product.save();
    return product;
};

//# sourceMappingURL=update.js.map