"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "server", {
    enumerable: true,
    get: function() {
        return server;
    }
});
const _elysia = require("elysia");
const _cors = require("@elysiajs/cors");
const _swagger = require("@elysiajs/swagger");
const _config = require("./constants/config");
const server = new _elysia.Elysia().use((0, _cors.cors)()).use((0, _swagger.swagger)()).get('/', ()=>'API is running 🚀');
server.listen(_config.PORT, ({ url })=>{
    console.log(`🦊 Elysia is running at ${url}`);
});

//# sourceMappingURL=index.js.map