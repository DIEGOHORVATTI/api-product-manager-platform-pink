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
    Transaction: function() {
        return Transaction;
    },
    TransactionSchema: function() {
        return TransactionSchema;
    }
});
const _elysia = require("elysia");
const _mongoose = require("mongoose");
const _config = require("../constants/config");
const _setdefaultsettingsschema = require("../shared/set-default-settings-schema");
const _connectiondb = require("../shared/connection-db");
const TransactionSchema = {
    body: _elysia.t.Object({
        userId: _elysia.t.String().objectId(),
        plan: _elysia.t.Enum({
            Free: 'Free',
            Pro: 'Pro'
        }),
        paymentMethod: _elysia.t.Enum({
            pix: 'pix',
            credit_card: 'credit_card'
        }),
        status: _elysia.t.Enum({
            pending: 'pending',
            completed: 'completed',
            failed: 'failed'
        }),
        amount: _elysia.t.Number()
    })
};
const SchemaModel = new _mongoose.Schema({
    userId: {
        type: _mongoose.Types.ObjectId,
        required: true,
        ref: _config.collectionsData.User.name
    },
    plan: {
        type: String,
        enum: [
            'Free',
            'Pro'
        ],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: [
            'pix',
            'credit_card'
        ],
        required: true
    },
    status: {
        type: String,
        enum: [
            'pending',
            'completed',
            'failed'
        ],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: _config.collectionsData.Transaction.collection
});
(0, _setdefaultsettingsschema.setDefaultSettingsSchema)(SchemaModel);
const Transaction = _connectiondb.connectDB.model(_config.collectionsData.Transaction.name, SchemaModel);

//# sourceMappingURL=Transaction.js.map