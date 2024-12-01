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
    Company: function() {
        return Company;
    },
    CompanySchema: function() {
        return CompanySchema;
    }
});
const _elysia = require("elysia");
const _mongoose = require("mongoose");
const _config = require("../constants/config");
const _shared = require("../shared");
const CompanySchema = {
    body: _elysia.t.Object({
        name: _elysia.t.String(),
        cnpj: _elysia.t.String(),
        about: _elysia.t.Optional(_elysia.t.String())
    })
};
const CompanySchemaModel = new _mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true,
        unique: true
    },
    about: {
        type: String
    }
}, {
    timestamps: true,
    collection: _config.collectionsData.Company.collection
});
(0, _shared.setDefaultSettingsSchema)(CompanySchemaModel);
const Company = _shared.connectDB.model(_config.collectionsData.Company.name, CompanySchemaModel);

//# sourceMappingURL=Campany.js.map