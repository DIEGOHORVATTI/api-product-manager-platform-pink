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
    HOST_API: function() {
        return HOST_API;
    },
    JWT_EXP: function() {
        return JWT_EXP;
    },
    JWT_SECRET: function() {
        return JWT_SECRET;
    },
    MONGODB_DATABASE: function() {
        return MONGODB_DATABASE;
    },
    MONGO_URL: function() {
        return MONGO_URL;
    },
    NODE_ENV: function() {
        return NODE_ENV;
    },
    PORT: function() {
        return PORT;
    },
    STRIPE_SECRET_KEY: function() {
        return STRIPE_SECRET_KEY;
    },
    STRIPE_WEBHOOK_SECRET: function() {
        return STRIPE_WEBHOOK_SECRET;
    },
    collectionsData: function() {
        return collectionsData;
    }
});
const collectionsData = {
    User: {
        name: 'User',
        collection: 'users'
    },
    Product: {
        name: 'Product',
        collection: 'products'
    },
    Transaction: {
        name: 'Transaction',
        collection: 'transactions'
    },
    Company: {
        name: 'Company',
        collection: 'companies'
    }
};
const HOST_API = process.env.HOST_API || '';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || '';
const MONGO_URL = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXP = process.env.JWT_EXP || '7d';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const NODE_ENV = process.env.NODE_ENV;

//# sourceMappingURL=config.js.map