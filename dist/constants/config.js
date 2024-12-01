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
    JWT_REFRESH_EXP: function() {
        return JWT_REFRESH_EXP;
    },
    JWT_REFRESH_NAME: function() {
        return JWT_REFRESH_NAME;
    },
    JWT_REFRESH_SECRET: function() {
        return JWT_REFRESH_SECRET;
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
    collectionsData: function() {
        return collectionsData;
    }
});
const collectionsData = {
    User: {
        name: 'User',
        collection: 'users'
    }
};
const HOST_API = process.env.HOST_API || '';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || '';
const MONGO_URL = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXP = process.env.JWT_EXP || '7d';
const JWT_REFRESH_EXP = process.env.JWT_REFRESH_EXP || '30d';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh';
const JWT_REFRESH_NAME = process.env.JWT_REFRESH_NAME || 'refresh';
const NODE_ENV = process.env.NODE_ENV;

//# sourceMappingURL=config.js.map