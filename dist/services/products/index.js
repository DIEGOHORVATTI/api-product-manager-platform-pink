"use strict";Object.defineProperty(exports,"__esModule",{value:true});_export_star(require("./get-all"),exports);_export_star(require("./get-one"),exports);_export_star(require("./create"),exports);_export_star(require("./update"),exports);_export_star(require("./remove"),exports);function _export_star(from,to){Object.keys(from).forEach(function(k){if(k!=="default"&&!Object.prototype.hasOwnProperty.call(to,k)){Object.defineProperty(to,k,{enumerable:true,get:function(){return from[k]}})}});return from}