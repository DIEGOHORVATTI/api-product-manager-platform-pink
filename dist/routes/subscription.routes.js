"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _elysia = require("elysia");
const _jwt = require("../middlewares/jwt");
const _subscriptions = require("../services/subscriptions");
const router = new _elysia.Elysia().group('/subscriptions', (server)=>server.use(_jwt.jwt).post('/', async ({ body, user })=>{
        const subscription = await (0, _subscriptions.createSubscriptionService)(body, user);
        return {
            message: 'Subscription created successfully',
            subscription
        };
    }, {
        body: _elysia.Elysia.t.Object({
            plan: _elysia.Elysia.t.Enum({
                Free: 'Free',
                Pro: 'Pro'
            }),
            paymentMethod: _elysia.Elysia.t.Enum({
                pix: 'pix',
                credit_card: 'credit_card'
            })
        })
    }).delete('/', async ({ user })=>{
        await (0, _subscriptions.cancelSubscriptionService)(user);
        return {
            message: 'Subscription cancelled successfully'
        };
    }).get('/', async ({ user })=>{
        const subscription = await (0, _subscriptions.getSubscriptionService)(user);
        return {
            message: 'Subscription retrieved successfully',
            subscription
        };
    }));
const _default = router;

//# sourceMappingURL=subscription.routes.js.map