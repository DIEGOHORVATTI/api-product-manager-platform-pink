"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Product: function() {
        return Product;
    },
    ProductSchema: function() {
        return ProductSchema;
    }
});
const _elysia = require("elysia");
const _mongoose = require("mongoose");
const _config = require("../constants/config");
const _setdefaultsettingsschema = require("../shared/set-default-settings-schema");
const _connectiondb = require("../shared/connection-db");
const ProductSchema = {
    body: _elysia.t.Object({
        name: _elysia.t.String(),
        description: _elysia.t.String(),
        code: _elysia.t.String({
            minLength: 6,
            maxLength: 9
        }),
        price: _elysia.t.Number(),
        company: _elysia.t.Object({
            id: _elysia.t.String(),
            name: _elysia.t.String()
        })
    })
};
const SchemaModel = new _mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        id: {
            type: _mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        }
    },
    code: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: _config.collectionsData.Product.collection
});
(0, _setdefaultsettingsschema.setDefaultSettingsSchema)(SchemaModel);
const Product = _connectiondb.connectDB.model(_config.collectionsData.Product.name, SchemaModel);

//# sourceMappingURL=Product.js.map