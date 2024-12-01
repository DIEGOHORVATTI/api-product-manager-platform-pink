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
    User: function() {
        return User;
    },
    UserSchema: function() {
        return UserSchema;
    }
});
const _elysia = require("elysia");
const _mongoose = require("mongoose");
const _config = require("../constants/config");
const _setdefaultsettingsschema = require("../shared/set-default-settings-schema");
const _connectiondb = require("../shared/connection-db");
const UserSchema = {
    body: _elysia.t.Object({
        name: _elysia.t.String(),
        surname: _elysia.t.String(),
        email: _elysia.t.String({
            format: 'email'
        }),
        password: _elysia.t.String({
            minLength: 6
        }),
        photo: _elysia.t.Optional(_elysia.t.String()),
        company: _elysia.t.Optional(_elysia.t.Array(_elysia.t.Object({
            id: _elysia.t.String(),
            name: _elysia.t.String(),
            cnpj: _elysia.t.String()
        }))),
        plan: _elysia.t.Enum({
            Free: 'Free',
            Pro: 'Pro'
        })
    })
};
const SchemaModel = new _mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: [
            String
        ],
        default: [
            'user'
        ]
    },
    photo: String,
    company: {
        type: [
            {
                id: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                cnpj: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    plan: {
        type: String,
        enum: [
            'Free',
            'Pro'
        ],
        default: 'Free'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true,
    collection: _config.collectionsData.User.collection
});
(0, _setdefaultsettingsschema.setDefaultSettingsSchema)(SchemaModel);
SchemaModel.methods.comparePassword = function(password) {
    return Bun.password.verify(password, this.password);
};
const User = _connectiondb.connectDB.model(_config.collectionsData.User.name, SchemaModel);

//# sourceMappingURL=User.js.map