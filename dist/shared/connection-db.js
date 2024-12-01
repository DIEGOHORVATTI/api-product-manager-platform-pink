"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connectDB", {
    enumerable: true,
    get: function() {
        return connectDB;
    }
});
const _config = require("../constants/config");
const _mongoose = require("mongoose");
const _packagejson = require("../../package.json");
const connectDB = (0, _mongoose.createConnection)(_config.MONGO_URL, {
    dbName: _config.MONGODB_DATABASE,
    maxPoolSize: 10
});
connectDB.once('connected', ()=>{
    console.info('🟢 Database connected');
    if (_config.NODE_ENV) console.info(`🌟 ${_config.NODE_ENV}`);
    if (_packagejson.version) console.info(`🔖 ${_packagejson.version}`);
});
connectDB.on('error', (error)=>{
    console.error(`🔥 ${error}`);
});

//# sourceMappingURL=connection-db.js.map