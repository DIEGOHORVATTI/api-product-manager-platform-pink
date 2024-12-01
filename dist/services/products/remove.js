"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteProductService", {
    enumerable: true,
    get: function() {
        return deleteProductService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const deleteProductService = async (id)=>{
    const domainExists = await _User.User.findOne({
        _id: id
    });
    if (!domainExists) {
        throw (0, _elysia.error)('Not Found', {
            error: 'User not found'
        });
    }
    return _User.User.deleteOne({
        _id: id
    });
};

//# sourceMappingURL=remove.js.map