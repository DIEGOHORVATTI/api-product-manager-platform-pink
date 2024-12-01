"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _elysia = require("elysia");
const _cors = require("@elysiajs/cors");
const _swagger = require("@elysiajs/swagger");
const _config = require("./constants/config");
const _nodefs = require("node:fs");
const _nodepath = require("node:path");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const app = new _elysia.Elysia();
const routesPath = (0, _nodepath.join)(__dirname, 'routes');
const routerModules = (0, _nodefs.readdirSync)(routesPath);
(async ()=>{
    for (const routerModule of routerModules){
        const modulePath = (0, _nodepath.join)(routesPath, routerModule);
        try {
            const route = await Promise.resolve(modulePath).then((p)=>/*#__PURE__*/ _interop_require_wildcard(require(p)));
            const router = route.default // Acesse a exportação padrão
            ;
            if (!router || typeof router.group !== 'function') {
                console.error(`Roteador inválido no módulo: ${routerModule}`);
                continue;
            }
            const { name } = (0, _nodepath.parse)(routerModule);
            // Adiciona o grupo ao app
            app.group(`/${name}`, router);
        } catch (error) {
            console.error(`Erro ao carregar módulo ${routerModule}:`, error);
        }
    }
    app.use((0, _cors.cors)()).use((0, _swagger.swagger)()).get('/', ()=>'API is running 🚀').listen(_config.PORT);
    console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
})();

//# sourceMappingURL=index.js.map